(ns eatme.controllers.api
  (:require [cemerick.friend :as friend]
            [eatme.config :refer [config]]))

(def basket-store (atom {}))

(defn current-user []
  (or (:email (friend/current-authentication)) :public))

(defn ping-the-api [pingback]
  (str "You have hit the API with: " pingback))

(defn load-basket [id]
  (let [id (Long/parseLong id)]
    (if (contains? @basket-store id)
      (get @basket-store id)
      (throw (Exception. (str "No basket found for id " id))))))

(defn basket-id [basket]
  (if-let [id (:id basket)]
    (Long/parseLong id)
    (inc (count @basket-store))))

(defn- url-for [basket-id]
  (str (config :eatme-url) "/%23" basket-id))

(defn save-basket [basket]
  (let [id (basket-id basket)]
    (swap! basket-store assoc id (assoc basket
                                   :id id
                                   :owner (current-user)))
    {:id id
     :url (url-for id)}))

(defn user-details []
  (println "identity =" friend/*identity*)
   (friend/current-authentication)) ;; not ideal, should pass the request object through

(defn user-baskets []
  (let [owner (current-user)]
    (filter (fn [b] (= owner (:owner b))) (vals @basket-store))))
