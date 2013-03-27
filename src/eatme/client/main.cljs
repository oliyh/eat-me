(ns eatme.client.main
  (:require [shoreleave.common :as common]
            [shoreleave.browser.history :as history]
            [shoreleave.remotes.http-rpc]
            [shoreleave.pubsubs.simple :as pbus]
            [shoreleave.pubsubs.protocols :as pubsub]
            [shoreleave.pubsubs.publishable :as pcore]
            [domina :as d]
            [domina.events :as event]
            [domina.css :as css]
            [domina.xpath :as x]
            [eatme.client.render :as render])
  (:require-macros [shoreleave.remotes.macros :as srm]))

(def query-args (common/query-args-map))
(def hash-args (common/hash-args-map))

;; Integrate history/back-button to the search
;For example:
;    (history/navigate-callback #(process-search (subs (:token %) 4) false))
;Where process-search is the main action to take when processing the page/url

;; ### Browser REPL
;; If you add a `repl` as a query-string arg, even on the live site,
;; You can remotely interact with the site from the local REPL
;; Visit: `http://127.0.0.1:8080/test?repl=yes#q=something+else`
(common/toggle-brepl query-args :repl)

;; ### Confirm we have remote-calling activated
;;(srm/rpc
;;  (api/ping-the-api "Testing...") [pong-response]
;;    (js/alert pong-response))

;;(srm/rpc
;;  (api/this-is-404 "Failure") [api-response]
;;    :on-success (js/alert "You should never see this")
;;    :on-error (js/alert "Remotes correctly handle error conditions"))

(def ^{:private true} bus (pbus/bus))


(def add-item-button (d/by-id "add-item-button"))
(def item-name-field (d/by-id "item-name"))
(def items-list (d/by-id "items"))
  
(def item-added (pubsub/publishize (fn [e] {:item-name (d/value item-name-field)}) bus))

(def item-deleted (pubsub/publishize (fn [e] {:item (event/target e)}) bus))

(def quantity-changed (pubsub/publishize
                       (fn [direction e] {:direction direction
                                          :item (event/target e)}) bus))

(defn on-enter [e f]
  (when (= 13 (:keyCode e)) (item-added e)))

(event/listen! add-item-button :click #(item-added %))
(event/listen! item-name-field :keypress #(on-enter % item-added))

(defn add-item-to-list [item]
  (d/append! items-list (render/shopping-list-item item))
  (event/listen! (css/sel items-list "button[rel=delete-item]") :click #(item-deleted %))
  (event/listen! (css/sel items-list "button[rel=increment]") :click #(quantity-changed :inc %))
  (event/listen! (css/sel items-list "button[rel=decrement]") :click #(quantity-changed :dec %)))

(defn remove-item-from-list [item]
  ;; (:item item) is actually the delete button that was clicked
  (d/detach! (-> item :item .-parentNode)))

(defn adjust-quantity [direction value]
  (condp = direction
    :inc (inc value)
    :dec (dec value)))

(defn change-quantity [{:keys [item direction]}]
  (let [qty (-> item (x/xpath "../input"))]
    (d/set-value! qty (adjust-quantity direction (js/parseInt (d/value qty))))))

(defn focus-item-input [& args]
  (.focus item-name-field))

(defn clear-item-input [& args]
  (d/set-value! item-name-field ""))

(defn log-to-console [o]
  (js/console.log "event: " o))

(pubsub/subscribe bus item-added add-item-to-list)
(pubsub/subscribe bus item-added log-to-console)
(pubsub/subscribe bus item-added focus-item-input)
(pubsub/subscribe bus item-added clear-item-input)

(pubsub/subscribe bus item-deleted log-to-console)
(pubsub/subscribe bus item-deleted remove-item-from-list)

(pubsub/subscribe bus quantity-changed change-quantity)

(focus-item-input)