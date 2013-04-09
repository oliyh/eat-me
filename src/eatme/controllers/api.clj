(ns eatme.controllers.api)

(defn ping-the-api [pingback]
  (str "You have hit the API with: " pingback))

(defn load-basket []
  [{:item "apple"} {:item "orange"}])