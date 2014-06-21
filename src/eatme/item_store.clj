(ns eatme.item-store
  (:use [monger.operators])
  (:require [eatme.config :refer [config]]
            [cheshire.generate]
            [monger.core :as m]
            [monger.collection :as mc]
            [monger.query :as mq]
            [monger.joda-time]
            [eatme.item-library :as library])
  (:import [org.bson.types ObjectId]
           [com.mongodb DB WriteConcern]))

(defn init
  "Connect to Mongo"
  []
  (m/connect-via-uri! (config :MONGOLAB_URI))
  (m/set-db! (m/get-db))) ;; db name is in the uri

(defn add-item [cat item]
  (mc/update "item"
             {:product-id (:product-id item)}
             (assoc item :category [(get-in cat [:dept :name])
                                    (get-in cat [:aisle :name])
                                    (get-in cat [:shelf :name])])
             :upsert true))

(defn suggest-item [q]
  (map #(update-in % [:_id] str)
       (sort-by #(count (:name %))
                (mq/with-collection "item"
                  (mq/find {:name {$regex (str ".*" q ".*") $options "i"}})
                  (mq/limit 10)))))

(defn populate-from-library []
  (doseq [category (library/all-shelves)]
    (println "Populating category" category)
    (doseq [p (library/products (-> category :shelf :id))]
      (add-item category p))))

#_(defn empty-store []
  (mc/remove "item"))

(defn count-items []
  (mc/count "item"))
