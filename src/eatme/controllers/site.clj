(ns eatme.controllers.site
  (:use [ring.middleware.anti-forgery :only [*anti-forgery-token*]])
  (:require [hiccup.page :as h]
            [cemerick.friend :as friend]
            [cemerick.friend.openid :as openid]
            [ring.util.response :as resp]))

(defn index [session]
  (slurp "resources/public/html/shopping-list.html"))

(defn test-shoreleave []
  (slurp "resources/public/html/test.html"))

(def providers [{:name "Google" :url "https://www.google.com/accounts/o8/id"}
                {:name "Yahoo" :url "http://me.yahoo.com/"}])

(defn logout [req]
  (friend/logout* (resp/redirect (str (:context req) "/"))))

(defn auth [req]
  (h/html5
   [:div
    (for [{:keys [name url]} providers
          :let [base-login-url (str "/login?identifier=" url)
                dom-id (str (gensym))]]
      [:form {:method "POST" :action "login"}
       [:input {:type "hidden" :name "identifier" :value url :id dom-id}]
       [:input {:type "hidden" :name "__anti-forgery-token" :value *anti-forgery-token*}]
       [:div.btn-group
        [:button.btn name]
        [:button.btn {:type "submit"} (str "Sign in with " name)]]])]))
