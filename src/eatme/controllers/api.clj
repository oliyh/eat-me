(ns eatme.controllers.api)

(defn ping-the-api [pingback]
  (str "You have hit the API with: " pingback))

(defn load-basket [id]
  [{:item-name "apple" :qty 1}
   {:item-name "orange" :qty 2}
   {:item-name (str "Special item for " id) :qty 5}])