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
                        (let [rs (select-keys % [:_id :_basket :_owner])]
                          (zipmap (keys rs) (map str (vals rs)))))]
    (-> b
        id-swap
        (update-in [:items] #(map id-swap %)))))

(defn load-basket [id]
  (let [basket-id (to-object-id id)]
    (coerce-to-edn (assoc (mc/find-map-by-id "basket" basket-id)
                     :items (mc/find-maps "items" {:_basket basket-id})))))

(defn user-baskets [owner-id]
  (when owner-id
    (reverse (sort-by :timestamp
                      (map coerce-to-edn
                           (mc/find-maps "basket" {:_owner (to-object-id owner-id)}))))))

(defn basket-exists? [id]
  (nil? (load-basket id)))

(defn create-basket! [owner-id]
  (let [id (ObjectId.)
        now (System/currentTimeMillis)
        owner-id (when owner-id (ObjectId. owner-id))]
    (mc/insert "basket" {:_id id :_type :basket :_created now :_updated now :_owner owner-id})
    (str id)))

(defn touch-basket! [basket-id]
  (mc/update-by-id "basket" (ObjectId. basket-id) {$set {:_updated (System/currentTimeMillis)}}))

(def item-updateable #{:name :qty :price :best-match :alternatives :category :product-id})

(defn upsert-item! [basket-id item]
  (let [item-id (to-object-id (or (:_id item) (ObjectId.)))]
    (mc/save "items" (merge (select-keys item item-updateable)
                            {:_basket (to-object-id basket-id)
                             :_type :item
                             :_id item-id}))
    (touch-basket! basket-id)))

(defn delete-item! [item-id]
  (mc/remove-by-id "items" (to-object-id item-id)))

(defn delete-basket! [id]
  (let [basket-id (ObjectId. id)]
    (mc/remove-by-id "basket" basket-id)
    (mc/remove "items" {:_basket basket-id})))
