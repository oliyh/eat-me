(ns eatme.models.users
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

(defn coerce-to-edn [u]
  (update-in u [:_id] str))

(defn create-user! [email]
  (let [id (ObjectId.)
        now (System/currentTimeMillis)
        user {:_id id :_type :user :_created now :email email}]
    (mc/insert "users" user)
    user))

(defn get-user-by-email [email]
  (coerce-to-edn
   (if-let [user (mc/find-one-as-map "users" {:email email})]
     user
     (create-user! email))))
