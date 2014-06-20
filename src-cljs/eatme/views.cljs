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

;; <input id="add-item-name" type="text" class="form-control input-lg" placeholder="Item...">

;; <span id="add-item-form" class="input-group-btn">

(defn render-suggestion [suggest items suggestion]
  (om/component
   (html
    [:li [:span {:on-click #(do (models/add-item! items suggestion)
                                (models/clear-suggestions! suggest))}
          [:a (str (:name suggestion) " (£" (:price suggestion) ")")]]])))

(defn render-item-form [{:keys [basket suggest]}]
  (om/component
   (let [items (:items basket)]
     (html
      [:div.search
       [:input {:id "add-item-name"
                :type "tex"
                :class "form-control input-lg"
                :placeholder "Item..."
                :value (or (:q suggest) "")
                :on-change #(models/suggest-item suggest (.-currentTarget %))}]
       (when (not-empty (:matches suggest))
         [:ul.search-ac
          (om/build-all (partial render-suggestion suggest items) (:matches suggest))])
       [:span {:class "input-group-btn"}
        [:button {:on-click #(models/add-new-item! items)
                  :class "btn btn-default btn-lg"
                  :type "button"}
         "Add"]]]
      ))))
