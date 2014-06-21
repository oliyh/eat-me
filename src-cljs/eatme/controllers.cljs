(ns eatme.controllers
  (:require [cljs.reader]
            [cljs.core.async :refer [<! >! timeout alts! pipe chan]]
            [chord.client :refer [ws-ch]]
            [eatme.utils :as utils])
  (:require-macros [cljs.core.async.macros :refer [go go-loop]]))


(def log (partial utils/log "monitoring:"))

(def RECONNECT-TIMEOUT 5000)
(def MESSAGE-WAIT-TIMEOUT 20000)

(def health-danger-msg
  {:_type :health
   :result "danger"
   :report "Connection to server lost, trying to reconnect..."})

(def health-success-msg
  {:_type :health
   :result "success"
   :report "Connected"})

(def health-warning-msg
  {:_type :health
   :result "warning"
   :report "Messages are late"})

(defn connect!
  "Attempts to connect, but can timeout after RECONNECT-TIMEOUT
  millis, in which case it returns nil. On success it returns the
  websocket channel."
  [address]
  (go
    (:ws-channel
     (first
      (alts! [(ws-ch address {:format :edn})
              (timeout RECONNECT-TIMEOUT)])))))

(defmulti assoc-msg! (fn [_ {:keys [_type]}] _type))

(defmethod assoc-msg! :item [state item]
  (swap! state (fn [s]
                 (update-in s [:basket :items]
                            (fn [items]
                              (conj (remove #(= (:_temp-id item) (:_temp-id %)) items)
                                    (dissoc item :_temp-id)))))))

(defmethod assoc-msg! :health [state msg]
  (swap! state assoc :health msg))

(defmethod assoc-msg! :default [state msg]
  (swap! state assoc (:_type msg) msg :health health-success-msg))

(defn msg-channel
  "Wraps the passed web socket channel so that if messages don't
  appear for MESSAGE-WAIT-TIMEOUT millis you get a ::timeout message
  on the channel, if the web socket connection is lost you get
  a ::disconnected message, or you get the actual message read from
  chan."
  [chan]
  (go
    (let [mto (timeout MESSAGE-WAIT-TIMEOUT)
          [msg ch] (alts! [chan mto])]
      (log msg)
      (if (= ch mto)
        ::timeout
        (if msg msg ::disconnected)))))

(defn start-monitoring-ws! [checks-state address]
  (log "starting to listen to" address)
  (let [upload-chan (chan)]
    (go-loop []
      (if-let [ws (<! (connect! address))]
        (do
          (pipe upload-chan ws)
          (assoc-msg! checks-state health-success-msg)
          (loop []
            (let [msg (<! (msg-channel ws))]
              (condp = msg
                ::timeout
                (do
                  (assoc-msg! checks-state health-warning-msg)
                  (recur))
                ::disconnected
                (do
                  (assoc-msg! checks-state health-danger-msg)) ;;don't recur into inner loop
                (do ;;default
                  (assoc-msg! checks-state (:message msg))
                  (recur))))))
        (do (log "ws connection to" address "failed, retrying...")
            (recur))))
    upload-chan))

(defn upload-fn [upload-chan]
  (fn [msg]
    (go
      (utils/log "sending" msg "to upload chan")
      (>! upload-chan msg))))

(defn connect-to-server [basket-id]
  (let [app-state (atom {:suggest {:_type :suggest}})
        upload-chan (start-monitoring-ws! app-state
                                          (str "ws://" js/window.location.host "/" basket-id "/async"))]
    [app-state (upload-fn upload-chan)]))
