(ns eatme.item-store
  (:use [monger.operators])
  (:require [eatme.config :refer [config]]
            [cheshire.generate]
            [monger.core :as m]
            [monger.collection :as mc]
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
  (mc/insert "item" (assoc item :category category)))

(defn- replace-_id [i]
  (let [id (str (:_id i))]
    (assoc (dissoc i :_id) :id id)))

(defn suggest-item [q]
  (map #(select-keys % [:Name])
       (mc/find-maps "item" {:Name {$regex (str ".*" q ".*") $options "i"}})))

;; currently only does the first 2 (of 500+) categories
(defn populate-from-library []
  (doseq [category (take 2 (library/all-shelves))]
    (doseq [p (library/products (-> category :shelf :Id))]
      (add-item category p))))
