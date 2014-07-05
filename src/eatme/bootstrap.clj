(ns eatme.bootstrap
  (:require [eatme.config :refer [init-config config]]
            [eatme.routes]
            [eatme.models.basket-store :as basket-store]
            [eatme.models.item-library :as item-lib]
            [clojure.tools.logging :as log]
            [com.stuartsierra.component :as component]
            [org.httpkit.server :refer [run-server]]))

(declare system)

(defrecord HttpKitComponent [app config]
  component/Lifecycle

  (start [this]
    (let [port (Integer/parseInt (str (config :PORT)))
          threads (or (config :threads) 4)
          server (run-server (app) {:port port :thread threads})]
      (log/info "Started Http-Kit Server on port" port)
      (log/info "You can view the site at " (config :eatme-url))
      (assoc this :http-server server)))

  (stop [{:keys [http-server] :as this}]
    (if http-server
      (do
        (http-server)
        (log/info "Shutdown Http-Kit Server" http-server)
        (dissoc this :http-server))
      this)))

(defrecord BasketStoreComponent [config]
  component/Lifecycle

  (start [this]
    (log/info "Initialising basket store")
    (basket-store/init!)
    this)

  (stop [this]
    this))

(defrecord ItemLibraryComponent [config]
  component/Lifecycle

  (start [this]
    (log/info "Initialising item library")
    (item-lib/init)
    this)

  (stop [this]
    this))


(defn bootstrap [& m]
  (let [mode (keyword (or (first m) :dev))]
    (println "Using" mode "config")
    (init-config mode)
    (intern 'eatme.bootstrap 'system
            (component/start
             (component/system-map
              :basket-store (BasketStoreComponent. config)
              :item-library (ItemLibraryComponent. config)
              :http-kit (HttpKitComponent. eatme.routes/app config))))))
