(ns eatme.client.render
  (:require
   [hiccups.runtime :as hiccupsrt])
  (:require-macros
   [hiccups.core :as h]))

(h/defhtml shopping-list-item [{:keys [item-name qty]}]
  [:div.row.controls-row {:rel item-name}
   [:div.span4.offset1
    [:label item-name]]
   [:div.span4
    [:input.input-small.span1 {:type "text" :name item-name :value (or qty 1) :rel "qty" :size 1}]
    [:button.btn {:rel "increment"} [:i.icon-plus-sign]]
    [:button.btn {:rel "decrement"} [:i.icon-minus-sign]]
    [:button.btn.btn-danger {:rel "delete-item"} [:i.icon-remove-sign]]]
   [:div.span1
    [:button.btn {:rel "complete"} [:i.icon-ok]]]])

(h/defhtml user-button [{:keys [firstname lastname]}]
  [:div.btn-toolbar
   [:div.btn-group
    [:a.btn.btn-success.dropdown-toggle {:data-toggle "dropdown"}
     [:i.icon-user] "&nbsp;" firstname "&nbsp;" lastname "&nbsp;"
     [:span.caret]]
    [:ul.dropdown-menu
     [:li [:a {:href "logout"} "Sign out"]]]]])
