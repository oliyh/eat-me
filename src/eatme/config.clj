(ns eatme.config
  (:require [clojure.string :as string]
            [shoreleave.server-helpers :refer [safe-read]]))

(def env-prefix "eatme_")
(def config-atom (atom {}))

(defn- read-config-file
  "Loads config from resources/config/<env>.edn"
  [config-name]
  (safe-read (slurp
              (str "resources/config/" config-name ".edn"))))

(defn read-env-vars [config]
  (let [env-keys (set (keys config))]
    (reduce
     (fn [env [k v]]
       (if-let [env-key (cond
                         (.startsWith k env-prefix) (keyword (string/replace-first k env-prefix ""))
                         (contains? env-keys k) k
                         :else nil)]
         (assoc env env-key v)
         env))
     {} (System/getenv))))

(defn init-config
  "Loads config from file and overrides from system env"
  ([]
     (init-config :dev))
  ([config-name]
     (let [config-name (name config-name)
           file-cfg (read-config-file config-name)
           env-cfg (read-env-vars file-cfg)]
       (reset! config-atom (merge {:name config-name} file-cfg env-cfg)))))

(def config
  (fn ([] @config-atom)
    ([& args] (apply @config-atom args))))
