(ns eatme.models.recipe-book
  (:require [clj-http.client :as client]))

(def ingred "http://ingred.oliy.co.uk")

(defn ingredients [url]
  (select-keys (:body (client/get (str ingred url) {:as :json})) [:ingredients]))

(defn suggest-recipe [q p]
  (:body (client/get (str ingred "/recipes/search/" q "/") {:as :json})))
