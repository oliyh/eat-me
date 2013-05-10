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
   [:h3 "Current Status " [:small "(this will change when you log in/out)"]]
   (if-let [auth (friend/current-authentication req)]
        [:p "Some information delivered by your OpenID provider:"
         [:ul (for [[k v] auth
                    :let [[k v] (if (= :identity k)
                                  ["Your OpenID identity" (str (subs v 0 (* (count v) 2/3)) "…")]
                                  [k v])]]
                [:li [:strong (str (name k) ": ")] v])]]
        [:div
         (for [{:keys [name url]} providers
               :let [base-login-url (str "/login?identifier=" url)
                     dom-id (str (gensym))]]
           [:form {:method "POST" :action "login"}
            [:input {:type "hidden" :name "identifier" :value url :id dom-id}]
            [:input {:type "hidden" :name "__anti-forgery-token" :value *anti-forgery-token*}]
            [:input {:type "submit" :class "button" :value name}]])])))
