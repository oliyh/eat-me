(ns eatme.client.render
  (:require 
   [hiccups.runtime :as hiccupsrt])
  (:require-macros
   [hiccups.core :as hiccups]))

(hiccups/defhtml shopping-list-item [{:keys [item-name qty]}]
  [:div {:rel item-name}
   [:label {:for "name"} item-name]
   [:input {:type "text" :name item-name :value (or qty 1)}]
   [:button {:rel "increment"} "+"]
   [:button {:rel "decrement"} "-"]
   [:button {:rel "delete-item"} "Delete"]])