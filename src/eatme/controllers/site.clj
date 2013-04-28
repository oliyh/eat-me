(ns eatme.controllers.site
  (:require [hiccup.page :as h]
            [cemerick.friend :as friend]
            [cemerick.friend.openid :as openid]))

(defn index [session]
  (slurp "resources/public/html/shopping-list.html"))

(defn test-shoreleave []
  (slurp "resources/public/html/test.html"))

(def providers [{:name "Google" :url "https://www.google.com/accounts/o8/id"}
                {:name "Yahoo" :url "http://me.yahoo.com/"}
                {:name "AOL" :url "http://openid.aol.com/"}
                {:name "Wordpress.com" :url "http://username.wordpress.com"}
                {:name "MyOpenID" :url "http://username.myopenid.com/"}])

(defn auth [req]
  (h/html5
      [:h2 "Authenticating with various services using OpenID"]
      [:h3 "Current Status " [:small "(this will change when you log in/out)"]]
      (if-let [auth (friend/current-authentication req)]
        [:p "Some information delivered by your OpenID provider:"
         [:ul (for [[k v] auth
                    :let [[k v] (if (= :identity k)
                                  ["Your OpenID identity" (str (subs v 0 (* (count v) 2/3)) "…")]
                                  [k v])]]
                [:li [:strong (str (name k) ": ")] v])]]
        [:div
         [:h3 "Login with…"]
         (for [{:keys [name url]} providers
               :let [base-login-url (str "/login?identifier=" url)
                     dom-id (str (gensym))]]
           [:form {:method "POST" :action "login"
                   :onsubmit (when (.contains ^String url "username")
                               (format "var input = document.getElementById(%s); input.value = input.value.replace('username', prompt('What is your %s username?')); return true;"
                                       (str \' dom-id \') name))}
            [:input {:type "hidden" :name "identifier" :value url :id dom-id}]
            [:input {:type "hidden" :name "__anti-forgery-token" :value ring.middleware.anti-forgery/*anti-forgery-token*}]
            [:input {:type "submit" :class "button" :value name}]])
         [:p "…or, with a user-provided OpenID URL:"]
         [:form {:method "POST" :action "login"}
          [:input {:type "text" :name "identifier" :style "width:250px;"}]
          [:input {:type "submit" :class "button" :value "Login"}]]])
      [:h3 "Logging out"]
      [:p [:a {:href "logout"} "Click here to log out"] "."]))
