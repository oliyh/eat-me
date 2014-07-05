(ns eatme.views.item-list
  (:require [om.core :as om :include-macros true]
            [eatme.utils :as utils]
            [eatme.models :as models]
            [sablono.core :as html :refer-macros [html]]))

(defn render-item [{:keys [name qty price] :as item}]
  (om/component
   (html
    [:div.row {:key name}
     [:div.col-xs-2.col-lg-2 qty]
     [:div.col-xs-9.col-lg-9 name]
     [:div.col-xs-1.col-lg-1 price]])))

(defn render-item-group [[category items]]
  (om/component
   (html
    [:div
     [:div.row.category-header
      [:div.col-xs-12.col-lg-12
       [:strong (or category "Other")]]]
     (om/build-all render-item items)])))

(defn render-list [app-state]
  (om/component
   (html
    [:div
     (om/build-all render-item-group
                   (group-by #(-> % :category second) (-> app-state :basket :items)))])))
