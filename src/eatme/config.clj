(ns eatme.config
  (:require [shoreleave.server-helpers :refer [safe-read]]))

(def config-atom (atom {}))

(defn init-config
  ""
  ([]
     (init-config :dev))
  ([config-name]
     (swap! config-atom (fn [old new] new)
            (safe-read (slurp
                        (str "resources/config/" (name config-name) ".edn"))))))

(def config (fn
              ([] @config-atom)
              ([& args] (apply @config-atom args))))
