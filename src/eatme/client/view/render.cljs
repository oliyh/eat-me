(ns eatme.client.render
  (:require
   [hiccups.runtime :as hiccupsrt]
   [eatme.date-utils :as date-utils]
   [eatme.utils :as utils]
   [clojure.string :as string])
  (:require-macros
   [hiccups.core :as h]))

(h/defhtml shopping-list-item [{:keys [item-name qty state]}]
  [:div.item.boxed.text-center
   {:rel item-name :id (gensym)
    :data-name item-name :data-qty qty}
   [:div
    [:p
     [:span.badge.badge-important (or qty 1)] "&nbsp;"
     [:strong item-name]]]
   [:div
    [:button.btn.btn-danger {:rel "delete-item"} [:i.icon-remove-sign]]
    [:button.btn.btn-warning {:rel "edit-item"} [:i.icon-pencil]]
    [:button.btn.btn-success {:rel "complete"} [:i.icon-ok]]]])

(h/defhtml user-button [{:keys [firstname lastname]}]
  [:div.btn-group
   [:a.btn.btn-small.btn-success.dropdown-toggle {:data-toggle "dropdown"}
    [:i.icon-user] "&nbsp;" firstname "&nbsp;" lastname "&nbsp;"
    [:span.caret]]
   [:ul.dropdown-menu
    [:li [:a {:href "logout"} "Sign out"]]]])

(h/defhtml user-baskets [baskets]
  (map (fn [b]
         [:div {:class "basket boxed text-center"}
          [:a {:href (str "#" (:id b))}
           [:div
            [:p [:span.badge.badge-info (count (:items b))] " items"]
            (utils/upper-first (date-utils/friendly-age (:timestamp b)))
            [:br]
            [:span [:small (date-utils/humanise (:timestamp b))]]]]])
       baskets))

(h/defhtml qr-code-image [url]
  [:img.media-object
   {:alt "QR code" :title "QR code"
    :src (str "https://chart.googleapis.com/chart?cht=qr&chs=160x160&chld=L|0&chl="
              url)}])

(h/defhtml recipe-suggestions [recipes]
  (map (fn [r] [:li [:a {:id (:url r)} (:name r)]]) recipes))

(h/defhtml item-suggestions [items]
  (map (fn [i] [:li [:a {:data-name (:Name i)} (:Name i)]]) items))
