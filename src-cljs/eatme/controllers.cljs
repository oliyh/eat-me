(ns eatme.controllers
  (:require [cljs.reader]
            [cljs.core.async :refer [<! timeout alts!]]
            [chord.client :refer [ws-ch]]
            [eatme.utils :as utils])
  (:require-macros [cljs.core.async.macros :refer [go go-loop]]))


(def log (partial utils/log "monitoring:"))

(def RECONNECT-TIMEOUT 5000)
(def MESSAGE-WAIT-TIMEOUT 5000)

(def monitoring-server-failure-msg
  {:type :monitoring-health
   :result false
   :name "Monitoring server"
   :report "Connection to the monitoring server lost, trying to reconnect..."})

(def monitoring-server-waiting-msg
  {:type :monitoring-health
   :result true
   :name "Monitoring server"
   :report "Connected, waiting for messages..."})

(def monitoring-server-late-messages-msg
  {:type :monitoring-health
   :result false
   :name "Monitoring server"
   :report "Messages are late."})

(defn connect!
  "Attempts to connect, but can timeout after RECONNECT-TIMEOUT
  millis, in which case it returns nil. On success it returns the
  websocket channel."
  [address]
  (go
    (first
     (alts! [(ws-ch address)
             (timeout RECONNECT-TIMEOUT)]))))

(defn assoc-msg!
  "Assocs the passed message into the app state and clears any
  existing monitoring health messages."
  [state msg]
  (swap! state dissoc :monitoring-health)
  (swap! state assoc (:type msg) msg))

(defn set-single-msg!
  "Clears the state of checks and replaces it with a single
  message (msg)."
  [state msg]
  (reset! state {(:type msg) msg}))

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

(defn parse-message [msg]
  (cljs.reader/read-string (:message msg)))

(defn start-monitoring-ws! [checks-state address]
  (log "starting to listen to" address)
  (go-loop []
    (if-let [ws (<! (connect! address))]
      (do
        (set-single-msg! checks-state monitoring-server-waiting-msg)
        (loop []
          (let [msg (<! (msg-channel ws))]
            (condp = msg
              ::timeout
              (do
                (assoc-msg! checks-state monitoring-server-late-messages-msg)
                (recur))
              ::disconnected
              (do
                (set-single-msg! checks-state monitoring-server-failure-msg)
                (log "stopped receiving messages from" address)) ;;don't recur into inner loop
              (do ;;default
                (assoc-msg! checks-state (parse-message msg))
                (utils/log @checks-state)
                (recur)))))
        (recur))
      (do (log "ws connection to" address "failed, retrying...")
          (recur)))))

(defn connect-to-server []
  (let [app-state (atom {})]
    (start-monitoring-ws! app-state (str "ws://" js/window.location.hostname ":8080/async"))
    app-state))
