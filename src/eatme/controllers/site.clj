(ns eatme.controllers.site
  (:use [clojure.core.async :only [chan timeout >!! <!! buffer alts!! thread
                                   go-loop close! go tap sliding-buffer untap mult]])
  (:require [hiccup.page :as h]
            [cemerick.friend :as friend]
            [cemerick.friend.openid :as openid]
            [ring.util.response :as resp]
            [eatme.item-store :as items]
            [clojure.tools.logging :as log]))

(def responses (chan))
(def response-mult (mult responses))

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

#_(thread
  (loop []
    (>!! responses (str "hello world" (System/currentTimeMillis)))
    (<!! (timeout 1000))
    (recur)))

(def the-store (atom {"foo" {:id "abcdef"
                             :type :basket
                             :items [{:name "Kiwis" :qty 3}
                                     {:name "Tin foil" :qty 1}]}}))

(defn save-basket! [basket-id basket]
  (println "Updating basket" basket-id "to" basket)
  (swap! the-store (fn [old]
                     (assoc old basket-id basket))))

(defn update-basket [basket-id basket]
  (thread
    (save-basket! basket-id basket)
    (let [resolved-items (for [item (:items basket)]
                           (if-let [match (and (not (:price item))
                                               (first (items/suggest-item (:name item))))]
                             (do (println match)
                                 (assoc item
                                   :item-id (:id match)
                                   :price (:Price match)
                                   :name (:Name match)))
                             item))
          updated-basket (assoc basket :items resolved-items)]

      (save-basket! basket-id updated-basket)
      (>!! responses updated-basket)
      )))

(defn create-basket! [id]
  (let [basket {:id id
                :type :basket
                :items []}]
    (swap! the-store (fn [old] (assoc old id basket)))
    basket))

(defn load-or-create-basket [basket-id]
  (or (@the-store basket-id)
      (create-basket! basket-id)))

(defn ws-handler [{:keys [ws-channel params] :as req}]
  (let [basket-id (:basket-id params)
        response-chan (tap response-mult (chan (sliding-buffer 10)))]
    (log/info "New subscriber to websocket")
    (>!! responses (load-or-create-basket basket-id))
    (go-loop []
      (let [[msg the-chan] (alts! [response-chan ws-channel])]
        (when msg
          (condp = the-chan
            response-chan (>! ws-channel (prn-str msg))
            ws-channel (update-basket basket-id (:message msg)))
          (recur)))
      (log/info "Subscriber disconnecting")
      (untap response-mult response-chan)
      (close! response-chan)))
  nil)
