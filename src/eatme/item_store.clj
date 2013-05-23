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

(defn add-item [category item]
  (mc/update "item" {:ProductId (:ProductId item)} (assoc item :category category) :upsert true))

(defn- replace-_id [i]
  (let [id (str (:_id i))]
    (assoc (dissoc i :_id) :id id)))

(defn suggest-item [q]
  (map replace-_id
       (mq/with-collection "item"
         (mq/find {:Name {$regex (str ".*" q ".*") $options "i"}})
         (mq/fields [:Name])
         (mq/limit 10))))

;; currently only does the first 2 (of 500+) categories
(defn populate-from-library []
  (doseq [category (library/all-shelves)]
    (println "Populating category" category)
    (doseq [p (library/products (-> category :shelf :Id))]
      (add-item category p))))
