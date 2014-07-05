(ns eatme.controllers.site
  (:use [clojure.core.async :only [chan timeout >!! <!! >! buffer alts!! thread
                                   go-loop close! go tap sliding-buffer untap mult]])
  (:require [hiccup.page :as h]
            [cemerick.friend :as friend]
            [cemerick.friend.openid :as openid]
            [ring.util.response :as resp]
            [eatme.item-store :as items]
            [eatme.basket-store :as basket]
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

(def providers [{:name "Google" :url "https://www.google.com/accounts/o8/id" :icon "google"}
                {:name "Yahoo" :url "http://me.yahoo.com/" :icon "yahoo"}])

(defn logout [req]
  (friend/logout* (resp/redirect (str (:context req) "/"))))

(defn auth [req]
  (h/html5
   [:div
    (for [{:keys [name url icon]} providers
          :let [base-login-url (str "/login?identifier=" url)
                dom-id (str (gensym))]]
      [:form {:method "POST" :action "login"}
       [:input {:type "hidden" :name "identifier" :value url :id dom-id}]
       [:div.btn-group
        [:button.btn [:i {:class (str "icon-social " icon)}]]
        [:button.btn {:type "submit"} (str "Sign in with " name)]]])]))

(defn item-store []
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

(defn new-session [req]
  (resp/redirect (str "/" (basket/create-basket!))))

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

(defn ws-handler [{:keys [ws-channel params] :as req}]
  (let [basket-id (:basket-id params)
        response-mult (:out (get-or-create-responses-chan basket-id))
        response-chan (tap response-mult (chan (sliding-buffer 10)))]
    (log/info "New subscriber to websocket" response-mult response-chan)
    (>!! response-chan (basket/load-basket basket-id))
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
