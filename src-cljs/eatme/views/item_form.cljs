(ns eatme.views.item-form
  (:require [om.core :as om :include-macros true]
            [eatme.utils :as utils]
            [eatme.models :as models]
            [sablono.core :as html :refer-macros [html]]
            [dommy.core :as dom])
  (:use-macros [dommy.macros :only [sel]]))

(defn focus-on-suggestion [_ index]
  (-> (nth (sel [:#suggestions :li :a]) index)
      (.focus)))

(defn- on-key [& {:as key-fs}]
  (fn [event]
    (let [known {13 :enter
                 43 :plus
                 45 :minus
                 40 :down
                 38 :up}
          code (if (< 0 (.-keyCode event))
                           (.-keyCode event)
                           (.-charCode event))
          key (get known code)]
      (utils/log "keycode is" key)
      (when-let [f (get key-fs key)]
        (f event)))))

(defn render-suggestion [suggest items suggestion]
  (om/component
   (html
    [:li [:span
          [:a {:on-click #(models/add-item! suggest items suggestion)}
           (str (:name suggestion) " (£" (:price suggestion) ")")]]])))

(defn render-item-form [{:keys [basket suggest]}]
  (om/component
   (let [items (:items basket)]
     (html
      [:div.search
       [:input {:id "add-item-name"
                :type "text"
                :class "form-control input-lg"
                :placeholder "Item..."
                :on-change #(models/suggest-item suggest (.-currentTarget %))
                :on-key-press (on-key :enter #(models/add-new-item! suggest items)
                                      :plus #(models/inc-qty! %)
                                      :minus #(models/dec-qty! %)
                                      :down #(focus-on-suggestion % 0))}]
       (when (not-empty (:matches suggest))
         [:ul#suggestions.search-ac
          (om/build-all (partial render-suggestion suggest items) (:matches suggest))])
       [:span {:class "input-group-btn"}
        [:button {:on-click #(models/add-new-item! suggest items)
                  :class "btn btn-default btn-lg"
                  :type "button"}
         "Add"]]]))))
