(ns eatme.views
  (:require [om.core :as om :include-macros true]
            [eatme.utils :as utils]
            [sablono.core :as html :refer-macros [html]]))


(defn render-item [[item-id {:keys [name qty] :as item}]]
  (om/component
   (html
    [:div.row {:data-key item-id}
     [:div.col-xs-3.col-lg-3 qty]
     [:div.col-xs-9.col-lg-9 name]
     ])))

(defn render-items [[list-id list]]
  (om/component
   (html
    [:div
     (om/build-all render-item (:items list))])))

(defn render-list [lists]
  ;;(js/console.log lists)
  (om/component
   (html
    [:div
     (om/build-all render-items lists)])))
