(ns eatme.models
  (:require [clojure.string]
            [om.core :as om :include-macros true]
            [eatme.controllers :as ctrl]
            [eatme.utils :as utils]))


(defn add-item! [items {:keys [item qty] :as new-item}]
  (utils/log @items)
  (utils/log new-item)
  (om/transact! items (fn [items]
                          #_(let [items (-> app-state :basket :items)]
                            (assoc-in app-state [:basket :items] (conj items new-item)))
                          (conj items new-item)))
  (utils/log @items))
