(ns eatme.controllers.api
  (:require [cemerick.friend :as friend]
            [eatme.config :refer [config]]
            [eatme.basket-store :as store]))

(defn current-user []
  (or (:email (friend/current-authentication)) :public))

(defn with-owner [basket]
  (assoc basket :owner (current-user)))

(defn ping-the-api [pingback]
  (str "You have hit the API with: " pingback))

(defn- url-for [basket-id]
  (str (config :eatme-url) "/%23" basket-id))

(defn load-basket [id]
  (assoc (store/load-basket id) :url (url-for id)))

(defn save-basket [basket]
  (let [{:keys [id]} (store/save-basket (with-owner basket))]
    {:id id
     :url (url-for id)}))

(defn user-details []
  (friend/current-authentication)) ;; not ideal, should pass the request object through

(defn user-baskets []
  (store/user-baskets (current-user)))
