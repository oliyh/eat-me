(ns eatme.models
  (:require [clojure.string]
            [om.core :as om :include-macros true]
            [eatme.controllers :as ctrl]
            [eatme.utils :as utils]))


(defn add-item! [items {:keys [item qty] :as new-item}]
  (om/transact! items (fn [items]
                        (conj items new-item))))
