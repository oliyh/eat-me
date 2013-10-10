(ns eatme.recipe-book
  (:require [clj-http.client :as client]
            [clojure.string :as string]))

(def ingred "http://ingred.oliy.co.uk")

(defn upper-first [s]
  (apply str (string/upper-case (first s)) (rest s)))

(defn ingredients [url]
  (:body (client/get (str ingred url) {:as :json})))

(defn suggest-recipe [q p]
  (:body (client/get (str ingred "/recipes/search/" q "/") {:as :json})))
