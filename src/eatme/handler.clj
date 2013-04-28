(ns eatme.handler
  (:require [compojure.handler :as handler]
            [eatme.routes :as routes]
            [eatme.config :refer [config]]
            [ring.middleware.gzip]
            [ring.middleware.file-info]
            [ring.middleware.anti-forgery]
            [ring.middleware.session.cookie :refer [cookie-store]]
            [shoreleave.middleware.rpc]
            [hiccup.middleware]
            [cemerick.friend :as friend]
            [cemerick.friend.openid :as openid]))

(defn init []
  (println "The eatme app is starting"))

(defn destroy []
  (println "The eatme app has been shut down"))

(def app routes/all-routes)

(defn get-handler [app]
  (-> app
      (shoreleave.middleware.rpc/wrap-rpc)
      (friend/authenticate
       {:allow-anon? true
        :default-landing-uri "/"
        :workflows [(openid/workflow
                     :openid-uri "/login"
                     :credential-fn identity)]})
      (ring.middleware.anti-forgery/wrap-anti-forgery)
      (ring.middleware.gzip/wrap-gzip)
      (handler/site {:session {:cookie-name "eatme"
                               :store (cookie-store {:key (config :session-secret)})
                                        ;:store (cookie-store)
                               :cookie-attrs {:max-age (config :session-max-age-seconds)
                                              :http-only true}}})
      (ring.middleware.file-info/wrap-file-info)
      (hiccup.middleware/wrap-base-url)))

(def war-handler (get-handler app))
