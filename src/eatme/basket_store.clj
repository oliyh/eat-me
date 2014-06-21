(ns eatme.basket-store
  (:require [eatme.config :refer [config]]
            [cheshire.generate]
            [monger.core :as m]
            [monger.collection :as mc]
            [monger.joda-time]
            [monger.operators :refer :all]
            [monger.conversion :refer :all])
  (:import [org.bson.types ObjectId]
           [com.mongodb DB WriteConcern]))

(defn init!
  "Connect to Mongo"
  []
  (m/connect-via-uri! (config :MONGOLAB_URI))
  (m/set-db! (m/get-db))) ;; db name is in the uri

(defn coerce-to-edn [b]
  (let [id-swap #(merge (-> %
                            (update-in [:_type] keyword))
                        (let [rs (select-keys % [:_id :_basket])]
                          (zipmap (keys rs) (map str (vals rs)))))]
    (-> b
        id-swap
        (update-in [:items] #(map id-swap %)))))

(defn load-basket [id]
  (let [basket-id (to-object-id id)]
    (coerce-to-edn (assoc (mc/find-map-by-id "basket" basket-id)
                     :items (mc/find-maps "items" {:_basket basket-id})))))

(defn user-baskets [owner]
  (reverse (sort-by :timestamp (mc/find-maps "basket" {:owner owner}))))

(defn basket-exists? [id]
  (nil? (load-basket id)))

(defn create-basket! []
  (let [id (ObjectId.)]
    (mc/insert "basket" {:_id id :_type :basket})
    (str id)))

(defn add-item! [basket-id item]
  (let [id (ObjectId.)]
    (mc/insert "items" (merge {:_id id :_basket (to-object-id basket-id) :_type :item} item))
    (str id)))

(def item-updateable #{:name :qty})

(defn update-item! [item]
  (mc/update-by-id "items" (to-object-id (:_id item)) {$set (select-keys item item-updateable)}))

(defn delete-item! [item-id]
  (mc/remove-by-id "items" (to-object-id item-id)))

(defn delete-basket! [id]
  (let [basket-id (ObjectId. id)]
    (mc/remove-by-id "basket" basket-id)
    (mc/remove "items" {:_basket basket-id})))
