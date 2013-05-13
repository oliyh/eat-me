(ns eatme.server
  (:require [eatme.config :refer [config init-config]]
            [eatme.handler :as handler]
            [ring.server.standalone :as ring-server]))

;; You'll want to do something like: `(defonce server (start-server))`

(defn start-server
  "used for starting the server in development mode from REPL"
  ([] (start-server (init-config :dev)))
  ([config]
      (let [port (or (Integer. (get (System/getenv) "PORT" (config :eatme-port)))
                     8080)
            server (ring-server/serve (handler/get-handler #'handler/app)
                                      {:port port
                                       :init handler/init
                                       :auto-reload? true
                                       :destroy handler/destroy
                                       :join true})]
        (println (str "You can view the site at " (config :eatme-url)))
        server)))

(defn stop-server [server]
  (when server
    (.stop server)
    server))

(defn restart-server [server]
  (when server
    (doto server
      (.stop)
      (.start))))

(defn -main [& m]
  (let [mode-kw (keyword (or (first m) :dev))]
    (init-config mode-kw)
    (let [server (start-server (config))]
      server)))
