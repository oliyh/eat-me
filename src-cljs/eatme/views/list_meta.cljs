(ns eatme.views.list-meta
  (:require [om.core :as om :include-macros true]
            [eatme.utils :as utils]
            [eatme.models :as models]
            [sablono.core :as html :refer-macros [html]]))

(defn render-share [{:keys [url]}]
  (om/component
   (html
    [:div#share.detail-panel
     [:strong "Share"]
     [:span
      [:img {:title "Scan to share on smartphone"
             :src (str "https://chart.googleapis.com/chart?cht=qr&chs=80x80&chld=L|0&chl=" url)}]]
     [:span
      [:a {:href (str "mailto:?subject=My%20Shopping%20Basket&body=" url)
           :title "Click to share via email"}
       [:span.glyphicon.glyphicon-envelope]]
      [:a {:href url
           :title "Copy this link to share"}
       [:span.glyphicon.glyphicon-link]]]])))

(defn render-summary [{:keys [_created _updated items]}]
  (om/component
   (html
    [:div#summary.detail-panel
     [:strong "Summary"]
     [:span (str (count items) " items")]
     [:span {:title (utils/humanise-date _created)}
      (str "Created " (utils/friendly-age _created))]
     [:span {:title (utils/humanise-date _updated)}
      (str "Changed " (utils/friendly-age _updated))]])))

(defn render-basket-meta [{:keys [basket]}]
  (om/component
   (html
    [:div
     (om/build render-summary basket)
     (om/build render-share basket)
     ])))
