(ns eatme.bootstrap
  (:require [eatme.config :refer [init-config config]]
            [eatme.routes]
            [clojure.tools.logging :as log]
            [com.stuartsierra.component :as component]
            [org.httpkit.server :refer [run-server]]))

(declare system)

(defrecord HttpKitComponent [app config]
  component/Lifecycle

  (start [this]
    (let [port (or (config :port) 8080)
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

(defn bootstrap []
  (init-config)
  (intern 'eatme.bootstrap 'system
          (component/start
           (component/system-map
            :http-kit (HttpKitComponent. eatme.routes/app config)))))
