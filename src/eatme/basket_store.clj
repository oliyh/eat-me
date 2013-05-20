(ns eatme.basket-store
  (:require [eatme.config :refer [config]]
            [cheshire.generate]
            [monger.core :as m]
            [monger.collection :as mc]
            [monger.joda-time])
  (:import [org.bson.types ObjectId]
           [com.mongodb DB WriteConcern]))

(defn init
  "Connect to Mongo"
  []
  (m/connect-via-uri! (config :MONGOLAB_URI))
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

(defn get-state [a b]
  (if (not= (:state a) (:state b))
    "conflict"
    (:state a)))

(defn normalise-basket [{:keys [items] :as basket}]
  (assoc basket :items
         (for [item-group (vals (group-by :item-name items))]
           (reduce (fn [o n]
                     (assoc o :qty (+ (:qty o) (:qty n))
                            :state (get-state o n)))
                   (first item-group) (rest item-group)))))

(def states {"list" 0
             "basket" 1
             "conflict" 2})

(defn greater-state [a b]
  (condp some [(:state a) (:state b)]
    #(= "conflict" %) "conflict"
    #(= "basket" %) "basket"
    "list"))

(defn merge-baskets [a b]
  (let [all-a-items (group-by :item-name (:items (normalise-basket a)))
        all-b-items (group-by :item-name (:items (normalise-basket b)))]
    {:items
     (for [item-name (keys all-a-items)
           :let [a-items (get all-a-items item-name)
                 b-items (get all-b-items item-name)]]
       (cond
        (every? #(= (:qty (first a-items)) (:qty %)) (concat (rest a-items) b-items))
        (reduce (fn [o n] (assoc o :state (greater-state o n)))
                (first a-items) (concat (rest a-items) b-items))))}))
