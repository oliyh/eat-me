(ns eatme.client.render
  (:require
   [hiccups.runtime :as hiccupsrt]
   [eatme.date-utils :as date-utils]
   [clojure.string :as string])
  (:require-macros
   [hiccups.core :as h]))

(h/defhtml shopping-list-item [{:keys [item-name qty state]}]
  [:div.row-fluid.controls-row {:rel item-name :id (gensym)}
   [:div.span4
    [:label item-name]]
   [:div.span3
    [:input.span2 {:type "text" :name item-name :value (or qty 1) :rel "qty" :size 1}]
    "&nbsp;"
    [:button.btn.btn-danger {:rel "delete-item"} [:i.icon-remove-sign]]]
   [:div.span2
    [:button.btn {:rel "complete"} [:i.icon-ok]]]])

(h/defhtml user-button [{:keys [firstname lastname]}]
  [:div.btn-group
   [:a.btn.btn-small.btn-success.dropdown-toggle {:data-toggle "dropdown"}
    [:i.icon-user] "&nbsp;" firstname "&nbsp;" lastname "&nbsp;"
    [:span.caret]]
   [:ul.dropdown-menu
    [:li [:a {:href "logout"} "Sign out"]]]])

(h/defhtml user-baskets [baskets]
  (into [:ul]
        (map (fn [b]
               [:li [:a {:href (str "#" (:id b))} (date-utils/humanise (:timestamp b))]]) baskets)))

(h/defhtml qr-code-image [url]
  [:img.media-object
   {:alt "QR code" :title "QR code"
    :src (str "https://chart.googleapis.com/chart?cht=qr&chs=160x160&chld=L|0&chl="
              url)}])

(h/defhtml recipe-suggestions [recipes]
  (into [:ul] (map (fn [r] [:li {:data-ingredients (string/join "," (:ingredients r))} (:title r)]) recipes)))
