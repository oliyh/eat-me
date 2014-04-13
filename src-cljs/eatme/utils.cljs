(ns eatme.utils
  (:require [goog.uri.utils :as uri]
            [secretary.core :as secretary]))

(defn log [& m]
  (.log js/console (clojure.string/join " " m)))

(defn load-secretary []
  (set! (.-onload js/window)
        (fn [] (secretary/dispatch!
                (uri/getPath (.toString window.location ()))))))
