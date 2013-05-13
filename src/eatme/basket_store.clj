(ns eatme.basket-store
  (:require [eatme.config :refer [config]]
            [monger.core :as m]
            [monger.collection :as mc]
            [monger.joda-time])
  (:import [org.bson.types ObjectId]
           [com.mongodb DB WriteConcern]))

(defn init
  "Connect to Mongo"
  [{:keys [mongo-uri] :as config}]
  (m/connect-via-uri! mongo-uri)
  (m/set-db! (m/get-db))) ;; db name is in the uri

(defn- replace-id [id basket]
  (assoc (dissoc basket :id) :_id id))

(defn save-basket [basket]
  (let [id (if-let [id (:id basket)] (ObjectId. id) (ObjectId.))]
    (mc/update "basket" {:_id id} (replace-id id basket) :upsert true)
    {:id (str id)}))

(defn- replace-_id [basket]
  (let [id (str (:_id basket))]
    (assoc (dissoc basket :_id) :id id)))

(defn load-basket [id]
  (replace-_id (mc/find-map-by-id "basket" (ObjectId. id))))

(defn user-baskets [owner]
  (map replace-_id (mc/find-maps "basket" {:owner owner})))
