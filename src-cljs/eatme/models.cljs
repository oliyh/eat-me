(ns eatme.models
  (:require [clojure.string]
            [om.core :as om :include-macros true]
            [eatme.controllers :as ctrl]
            [eatme.utils :as utils]
            [dommy.core :as dom])
  (:use-macros [dommy.macros :only [sel1]]))

(defn read-item []
  (utils/log "qty is" (dom/value (sel1 :#add-item-qty)))
  {:qty (js/parseInt (dom/value (sel1 :#add-item-qty)))
   :name (dom/value (sel1 :#add-item-name))})

(defn add-item! [items {:keys [item qty] :as new-item}]
  (utils/log "Adding item!")
  (om/transact! items (fn [items]
                        (conj items new-item))))

(defn add-new-item! [items]
  (add-item! items (read-item)))

(defn suggest-item [suggest name-input]
  (let [q (dom/value name-input)]
    (if (< 2 (count q))
      (om/transact! suggest #(assoc % :q q))
      (om/transact! suggest #(dissoc % :q)))))
