(ns eatme.main
  (:require [clojure.string]
            [secretary.core :as secretary :include-macros true :refer [defroute]]
            [om.core :as om :include-macros true]
            [eatme.views :as views]
            [eatme.views.list-meta :refer [render-basket-meta]]
            [eatme.models :as models]
            [eatme.controllers :as ctrl]
            [eatme.utils :as utils]))

(defroute "/:basket-id" {:keys [basket-id] :as params}
  (let [[list-state upload-fn] (ctrl/connect-to-server basket-id)]
    (om/root views/render-list list-state
             {:target (. js/document (getElementById "list"))})
    (om/root render-basket-meta list-state
             {:target (. js/document (getElementById "basket-meta"))})
    (om/root views/render-health list-state
             {:target (. js/document (getElementById "health"))})
    (om/root views/render-item-form list-state
             {:target (. js/document (getElementById "add-item-form"))
              :tx-listen (fn [tx-data root-cursor]
                           (upload-fn (get (:new-state tx-data) (first (:path tx-data)))))})))

(utils/load-secretary)
