(ns eatme.routes
  (:require [compojure.core :as c-core :refer [defroutes
                                               GET POST PUT DELETE
                                               HEAD OPTIONS PATCH
                                               ANY]]
            [compojure.route :as c-route]
            [shoreleave.middleware.rpc :refer [remote-ns]]
            [ring.util.response :as resp]
            ;; Friend authentication
            ;;[ring.util.request :as request]
            [cemerick.friend :as friend]
            [cemerick.friend.openid :as openid]
            ;; Controllers
            [eatme.controllers.site :as cont-site]
            ;; Public APIs
            [eatme.controllers.api]))

;; Remote APIs exposed
;; -------------------
(remote-ns 'eatme.controllers.api :as "api")

;; Controller routes, ROA oriented
;; -------------------------------
(defroutes site
  (GET "/" {session :session} (cont-site/index session))
  (GET "/auth" req (cont-site/auth req))
  (GET "/test" [] (cont-site/test-shoreleave)))

;; Core system routes
;; ------------------
(defroutes app-routes
  (c-route/resources "/")
  (c-route/not-found "404 Page not found."))

;; The top-level collection of all routes
;; --------------------------------------
(def all-routes
  (friend/authenticate (c-core/routes site app-routes)
                       {:allow-anon? true
                        :default-landing-uri "/"
                        :workflows [(openid/workflow
                                     :openid-uri "/login"
                                     :credential-fn identity)]}))
