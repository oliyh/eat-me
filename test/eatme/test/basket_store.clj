(ns eatme.test.basket-store
  (:use [clojure.test])
  (:require [eatme.models.basket-store :as bs]))

(defn basket-with [& qty-items]
  {:items
   (for [[qty item-name state] (partition 3 qty-items)]
     {:item-name item-name :qty qty :state (name state)})})

(defn item [qty item-name state]
  {:item-name item-name :qty qty :state (name state)})

(defn list-item [qty name]
  (item qty name :list))

(defn compl-item [qty name]
  (item qty name :basket))
