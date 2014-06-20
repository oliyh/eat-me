(ns eatme.basket-store
  (:require [eatme.config :refer [config]]
            [cheshire.generate]
            [monger.core :as m]
            [monger.collection :as mc]
            [monger.joda-time]
            [monger.operators :refer :all])
  (:import [org.bson.types ObjectId]
           [com.mongodb DB WriteConcern]))

(defn init!
  "Connect to Mongo"
  []
  (m/connect-via-uri! (config :MONGOLAB_URI))
  (m/set-db! (m/get-db))) ;; db name is in the uri

(defn load-basket [id]
  (let [basket-id (ObjectId. id)]
    (assoc (mc/find-map-by-id "basket" basket-id)
      :items (mc/find-maps "items" {:_basket basket-id}))))

(defn user-baskets [owner]
  (reverse (sort-by :timestamp (mc/find-maps "basket" {:owner owner}))))

(defn basket-exists? [id]
  (nil? (load-basket id)))

(defn create-basket! []
  (let [id (ObjectId.)]
    (mc/insert "basket" {:_id id})
    (str id)))

(defn add-item! [basket-id item]
  (let [id (ObjectId. basket-id)]
    (mc/insert "items" (merge {:_id id :_basket (ObjectId. basket-id)} item))
    (str id)))

(defn delete-basket! [id]
  (mc/remove "basket" {:_id (ObjectId. id)}))
