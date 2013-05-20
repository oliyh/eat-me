(ns eatme.controllers.api
  (:require [cemerick.friend :as friend]
            [eatme.config :refer [config]]
            [eatme.basket-store :as store]
            [clj-time.core :as time]
            [eatme.recipe-book :as recipes]
            [eatme.item-store :as items]))

(defn current-user []
  (or (:email (friend/current-authentication)) :public))

(defn with-owner-and-timestamp [basket]
  (assoc basket
    :owner (current-user)
    :timestamp (time/now)))

(defn ping-the-api [pingback]
  (str "You have hit the API with: " pingback))

(defn- url-for [basket-id]
  (str (config :eatme-url) "/%23" basket-id))

(defn- for-api [{:keys [id timestamp] :as basket}]
  (assoc basket
    :url (url-for id)
    :timestamp (str timestamp)))

(defn load-basket [id]
  (for-api (store/load-basket id)))

(defn save-basket [basket]
  (let [{:keys [timestamp] :as basket} (with-owner-and-timestamp basket)]
    (let [{:keys [id]} (store/save-basket basket)]
      (for-api (assoc basket :id id)))))

(defn user-details []
  (friend/current-authentication)) ;; not ideal, should pass the request object through

(defn user-baskets []
  (map for-api (store/user-baskets (current-user))))

(defn suggest-recipe [q p]
  (recipes/suggest-recipe q p))

(defn suggest-item [q p]
  (items/suggest-item q))
