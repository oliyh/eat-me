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

(go-loop []
  (>!! responses (str "hello world" (System/currentTimeMillis))))

(defn ws-handler [{:keys [ws-channel] :as req}]
  (let [response-chan (tap response-mult (chan (sliding-buffer 10)))]
    (log/info "New subscriber to websocket")
    (go-loop []
      (when-let [r (first (alts! [response-chan ws-channel]))]
        (>! ws-channel (prn-str r))
        (recur))
      (log/info "Subscriber disconnecting")
      (untap response-mult response-chan)
      (close! response-chan)))
  nil)
