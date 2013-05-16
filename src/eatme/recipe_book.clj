(ns eatme.recipe-book
  (:require [clj-http.client :as client]
            [clojure.string :as string]))

(def recipe-puppy "http://www.recipepuppy.com/api/?q=omelet&p=1")

(defn call-api [q p]
  (:body (client/get recipe-puppy {:query-params {"q" q "p" p} :as :json})))

(defn upper-first [s]
  (apply str (string/upper-case (first s)) (rest s)))

(defn clean-recipe [{:keys [ingredients] :as recipe}]
  (-> recipe
      (select-keys [:title :href])
      (assoc :ingredients (map #(-> % string/trim upper-first) (string/split ingredients #",")))))

(defn suggest-recipe [q p]
  (map clean-recipe (:results (call-api q p))))
