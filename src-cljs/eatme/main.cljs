(ns eatme.main
  (:require [clojure.string]
            [secretary.core :as secretary :include-macros true :refer [defroute]]
            [om.core :as om :include-macros true]
            [eatme.views :as views]
            [eatme.models :as models]
            [eatme.controllers :as ctrl]
            [eatme.utils :as utils]
;;            [dommy.core :as dom]
   ))

(utils/log "hello world from main")

(defroute "/:basket-id" {:keys [basket-id] :as params}
  (let [[list-state upload-fn] (ctrl/connect-to-server basket-id)]
    (om/root views/render-list list-state
             {:target (. js/document (getElementById "list"))})
    (om/root views/render-item-form list-state
             {:target (. js/document (getElementById "add-item-form"))
              :tx-listen (fn [tx-data root-cursor]
                           (utils/log "tx-data" tx-data)
                           (upload-fn (get (:new-state tx-data) (first (:path tx-data)))))})))

(utils/load-secretary)
