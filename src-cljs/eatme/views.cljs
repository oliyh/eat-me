(ns eatme.views
  (:require [om.core :as om :include-macros true]
            [eatme.utils :as utils]
            [eatme.models :as models]
            [sablono.core :as html :refer-macros [html]]))


(defn render-item [{:keys [name qty] :as item}]
  (om/component
   (html
    [:div.row {:key name}
     [:div.col-xs-3.col-lg-3 qty]
     [:div.col-xs-9.col-lg-9 name]
     ])))

(defn render-items [basket]
  (om/component
   (html
    [:div
     (om/build-all render-item (:items basket))])))

(defn render-list [app-state]
  ;;(utils/log @app-state)
  (om/component
   (html
    [:div
     (om/build render-items (:basket app-state))])))

(defn render-item-form [{:keys [basket]}]
  ;; <button id="add-item-button" class="btn btn-default btn-lg" type="button">Add</button>
  (om/component
   (html
    (let [items (:items basket)]
      [:button {:on-click #(models/add-item! items {:name "bob" :qty 34})
                :class "btn btn-default btn-lg"
                :type "button"}
       "Add"])
    )))
