(ns eatme.main
  (:require [clojure.string]
            [secretary.core :as secretary :include-macros true :refer [defroute]]
            [om.core :as om :include-macros true]
            [eatme.views :as views]
            [eatme.controllers :as ctrl]
            [eatme.utils :as utils]
   ))

(utils/log "hello world from main")

(defroute "/" {:as params}
  (let [list-state (ctrl/connect-to-server)]
    (om/root views/render-list list-state
             {:target (. js/document (getElementById "list"))})))

(utils/load-secretary)
