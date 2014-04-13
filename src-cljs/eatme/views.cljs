(ns eatme.views
  (:require [om.core :as om :include-macros true]
            [eatme.utils :as utils]
            [sablono.core :as html :refer-macros [html]]))


(defn list-item [[id {:keys [name qty bought] :as item}]]
  (om/component
   (html
    [:pre "Hello world"]
    #_[:div.row {:id (name id)}
     [:div.col-xs-3.col-lg-3 qty]
     [:div.col-xs-9.col-lg-9 name]
     ])))

(defn render-list [list]
  (om/component
   (html
    [:pre "Hello"]
    #_[:div
     (om/build-all list-item list)])))
