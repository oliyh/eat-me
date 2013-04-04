(ns eatme.client.render
  (:require 
   [hiccups.runtime :as hiccupsrt])
  (:require-macros
   [hiccups.core :as hiccups]))

(hiccups/defhtml shopping-list-item [{:keys [item-name qty]}]
  [:tr {:rel item-name}
   [:td [:span item-name]]
   [:td
    [:input {:type "text" :name item-name :value (or qty 1) :rel "qty" :size 1}]
    [:button.btn {:rel "increment"} [:i.icon-plus-sign]]
    [:button.btn {:rel "decrement"} [:i.icon-minus-sign]]
    [:button.btn.btn-danger {:rel "delete-item"} [:i.icon-remove-sign]]]])