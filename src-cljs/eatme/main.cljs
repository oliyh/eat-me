(ns eatme.main
  (:require [clojure.string]
            [secretary.core :as secretary :include-macros true :refer [defroute]]
            [om.core :as om :include-macros true]
            [eatme.views.item-form :refer [render-item-form]]
            [eatme.views.list-meta :refer [render-basket-meta]]
            [eatme.views.user-meta :refer [render-user-meta]]
            [eatme.views.health :refer [render-health]]
            [eatme.views.item-list :refer [render-list]]
            [eatme.models :as models]
            [eatme.controllers :as ctrl]
            [eatme.utils :as utils]))

(defroute "/:basket-id" {:keys [basket-id] :as params}
  (let [[list-state upload-fn] (ctrl/connect-to-server basket-id)]
    (om/root render-list list-state
             {:target (. js/document (getElementById "list"))})
    (om/root render-basket-meta list-state
             {:target (. js/document (getElementById "basket-meta"))})
    (om/root render-user-meta list-state
             {:target (. js/document (getElementById "user-meta"))})
    (om/root render-health list-state
             {:target (. js/document (getElementById "health"))})
    (om/root render-item-form list-state
             {:target (. js/document (getElementById "add-item-form"))
              :tx-listen (fn [tx-data root-cursor]
                           (upload-fn (get (:new-state tx-data) (first (:path tx-data)))))})))

(utils/load-secretary)
