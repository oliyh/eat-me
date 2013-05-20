(ns eatme.config
  (:require [clojure.string :as string]
            [shoreleave.server-helpers :refer [safe-read]]))

(def config-atom (atom {}))

(defn- read-config-file
  "Loads config from resources/config/<env>.edn"
  [config-name]
  (safe-read (slurp
              (str "resources/config/" config-name ".edn"))))

(defn read-env-vars []
  (reduce
   (fn [env [k v]] (if (.startsWith k "eatme.")
                    (assoc env (keyword (string/replace-first k "eatme." "")) v)
                    env))
   {} (System/getenv)))

(defn init-config
  "Loads config from file and overrides from system env"
  ([]
     (init-config :dev))
  ([config-name]
     (let [config-name (name config-name)]
       (reset! config-atom (merge (read-config-file config-name)
                                  (read-env-vars))))))

(def config
  (fn ([] @config-atom)
    ([& args] (apply @config-atom args))))
