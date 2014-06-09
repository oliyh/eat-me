(ns eatme.models
  (:require [clojure.string]
            [om.core :as om :include-macros true]
            [eatme.controllers :as ctrl]
            [eatme.utils :as utils]
            [dommy.core :as dom])
  (:use-macros [dommy.macros :only [sel1]]))

(defn read-qty []
  (js/parseInt (dom/value (sel1 :#add-item-qty))))

(defn read-item []
  {:qty (read-qty)
   :name (dom/value (sel1 :#add-item-name))})

(defn add-item! [items {:keys [qty] :as new-item}]
  (let [new-item (assoc new-item :qty (or qty (read-qty)))]
    (utils/log "Adding item!")
    (om/transact! items (fn [items]
                          (conj items new-item)))))

(defn add-new-item! [items]
  (add-item! items (read-item)))

(defn suggest-item [suggest name-input]
  (let [q (dom/value name-input)]
    (if (< 2 (count q))
      (om/transact! suggest #(assoc % :q q))
      (om/transact! suggest #(dissoc % :q)))))
