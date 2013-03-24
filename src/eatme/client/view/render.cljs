(ns eatme.client.render
  (:require 
   [hiccups.runtime :as hiccupsrt])
  (:require-macros
   [hiccups.core :as hiccups]))

(hiccups/defhtml shopping-list-item [{:keys [item-name]}]
  [:tr
   [:td item-name]
   [:td [:button "Delete"]]])