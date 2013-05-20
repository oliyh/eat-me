(ns eatme.config
  (:require [shoreleave.server-helpers :refer [safe-read]]))

(def config-atom (atom {}))

(defn init-config
  "Loads config from resources/config/<env>.edn"
  ([]
     (init-config :dev))
  ([config-name]
     (reset! config-atom (safe-read (slurp
                                     (str "resources/config/" (name config-name) ".edn"))))))

(def config (fn
              ([] @config-atom)
              ([& args] (apply @config-atom args))))
