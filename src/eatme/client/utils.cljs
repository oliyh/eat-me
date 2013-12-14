(ns eatme.utils
  (:require [clojure.string :as string]))

(defn upper-first [s]
  (when-not (empty? s) (apply str (string/upper-case (first s)) (rest s))))
