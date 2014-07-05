(ns eatme.controllers.site
  (:use [clojure.core.async :only [chan timeout >!! <!! >! buffer alts!! thread
                                   go-loop close! go tap sliding-buffer untap mult]])
  (:require [hiccup.page :as h]
            [cemerick.friend :as friend]
            [cemerick.friend.openid :as openid]
            [ring.util.response :as resp]
            [eatme.models.item-store :as items]
            [eatme.models.basket-store :as basket]
            [clojure.tools.logging :as log]))

(def responses (atom {}))

(defn get-or-create-responses-chan [basket-id]
  (or (@responses basket-id)
      (let [in (chan)
            r {:in in
               :out (mult in)}]
        (go-loop []
            (<! (timeout 15000))
          (>! in (basket/load-basket basket-id))
          (recur))
        (swap! responses assoc basket-id r)
        r)))

(defn index [session]
  (clojure.java.io/resource "public/html/index.html"))

(defn load-item-store []
  (items/populate-from-library)
  (h/html5 [:p "complete"]))

(defn update-basket [user-chan basket-id basket]
  (thread
    (doseq [item (:items basket)]
      (basket/upsert-item! basket-id item))

    (let [persisted-basket (basket/load-basket basket-id)]
      ;; push out the new ids as soon as possible
      (>!! user-chan persisted-basket)

      (doall (for [item (:items persisted-basket)
                   :when (not (:category item))
                   :let [matches (items/suggest-item (:name item))]]
               (basket/upsert-item!
                basket-id (assoc item
                            :best-match (first matches)
                            :alternatives (rest matches)
                            :price (:price (first matches))
                            :category (:category (first matches)))))))

    (>!! user-chan (basket/load-basket basket-id))))

(defn new-session [{:keys [user] :as req}]
  (log/info "Creating basket! user is" user)
  (resp/redirect (str "/" (basket/create-basket! (:_id user)))))

(defmulti respond-to (fn [m & args] (:_type m)))

(defmethod respond-to :basket [basket user-chan basket-id]
  (update-basket user-chan basket-id basket))

(defmethod respond-to :suggest [query user-chan & args]
  (let [q (:q query)]
    (when (and (not-empty q) (< 2 (count q)))
      (thread
        (>!! user-chan {:_type :suggest
                        :q q
                        :matches (items/suggest-item q)})))))

(defn client-init [response-chan basket-id user]
  (>!! response-chan (basket/load-basket basket-id))
  (when user
    (>!! response-chan (merge user
                              {:_type :user
                               :baskets (basket/user-baskets (:_id user))
                               }))))

(defn ws-handler [{:keys [ws-channel params user] :as req}]
  (let [basket-id (:basket-id params)
        response-mult (:out (get-or-create-responses-chan basket-id))
        response-chan (tap response-mult (chan (sliding-buffer 10)))]
    (log/info "user is" user)
    (log/info "New subscriber to websocket" response-mult response-chan)
    (client-init response-chan basket-id user)
    (go-loop []
      (let [[msg the-chan] (alts! [response-chan ws-channel])]
        (when msg
          (condp = the-chan
            response-chan (>! ws-channel msg)
            ws-channel (respond-to (:message msg) response-chan basket-id))
          (recur)))
      (log/info "Subscriber disconnecting")
      (untap response-mult response-chan)
      (close! response-chan)))
  nil)
