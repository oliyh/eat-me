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

(defroute "/" {:as params}
  (let [list-state (ctrl/connect-to-server)]
    (om/root views/render-list list-state
             {:target (. js/document (getElementById "list"))})
    (om/root views/render-item-form list-state
             {:target (. js/document (getElementById "add-item-form"))
              :tx-listen (fn [tx-data root-cursor]
                           (utils/log "Transaction occurred!")
                           (utils/log tx-data)
                           (utils/log @root-cursor))})))

(utils/load-secretary)
