(ns eatme.views.user-meta
  (:require [om.core :as om :include-macros true]
            [eatme.utils :as utils]
            [eatme.models :as models]
            [sablono.core :as html :refer-macros [html]]))

(def providers [{:name "Google" :url "https://www.google.com/accounts/o8/id" :icon "google"}
                {:name "Yahoo" :url "http://me.yahoo.com/" :icon "yahoo"}])

(defn render-login-form [_]
  (om/component
   (html
    [:div#user.detail-panel
     [:strong "Sign in"]
     [:div.social
      (for [{:keys [name url icon]} providers
            :let [base-login-url (str "/login?identifier=" url)
                  dom-id (str (gensym))]]
        [:form {:method "POST" :action "login"}
         [:input {:type "hidden" :name "identifier" :value url :id dom-id}]
         [:button {:class (str "btn " icon)}]])]])))


(defn render-basket-link [{:keys [_id _created] :as basket}]
  (om/component
   (html
    [:li [:a {:href (str "/" _id)} (utils/humanise-date _created)]])))

(defn render-user [{:keys [firstname baskets]}]
  (om/component
   (html
    [:div#user.detail-panel
     [:strong (str "Hi, " firstname)]
     [:span [:a {:href "/logout"} [:span.glyphicon.glyphicon-log-out]]]
     [:ul
      (om/build-all render-basket-link baskets)]])))

(defn render-user-meta [{:keys [user]}]
  (om/component
   (html
    [:div
     (if user
       (om/build render-user user)
       (om/build render-login-form user))])))
