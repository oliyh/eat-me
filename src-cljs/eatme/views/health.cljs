(ns eatme.views.health
  (:require [om.core :as om :include-macros true]
            [eatme.utils :as utils]
            [eatme.models :as models]
            [sablono.core :as html :refer-macros [html]]))

(defn render-health [{:keys [health]}]
  (om/component
   (html
    [:span {:class (str "alert alert-" (:result health))}
     (:report health)])))
