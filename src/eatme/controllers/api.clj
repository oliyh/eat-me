(ns eatme.controllers.api)

(def basket-store (atom {}))

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
   
(defn save-basket [basket]
  (let [id (basket-id basket)]
    (swap! basket-store assoc id (:items basket))
    {:id id}))