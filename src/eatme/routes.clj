(ns eatme.routes
  (:use (ring.middleware [keyword-params :only [wrap-keyword-params]]
                             [params :only [wrap-params]]
                             [session :only [wrap-session]]
                             [flash :only [wrap-flash]]))
  (:require [compojure.core :as c-core :refer [defroutes
                                               GET POST PUT DELETE
                                               HEAD OPTIONS PATCH
                                               ANY]]
            [compojure.route :as c-route]
            [cemerick.friend :as friend]
            [cemerick.friend.openid :as openid]
            [ring.util.response :as response]
            [eatme.controllers.site :as cont-site]
            [chord.http-kit :refer [wrap-websocket-handler]]
            )
  (:import [java.util UUID]))

(defroutes site
  (GET "/logout" req (cont-site/logout req))
  (GET "/auth" req (cont-site/auth req))
  (GET "/admin/item-store" [] (cont-site/item-store))

  (GET "/" [] (response/redirect (str "/" (UUID/randomUUID))))
  (GET "/:basket-id" {session :session basket-id :basket-id} (cont-site/index session))
  (GET "/:basket-id/async" [basket-id] cont-site/ws-handler))

(defroutes app-routes
  (c-route/resources "/")
  (c-route/not-found "404 Page not found."))

(defn wrap-friend [app]
  (friend/authenticate
   app
   {:allow-anon? true
    :default-landing-uri "/"
    :workflows [(openid/workflow
                 :openid-uri "/login"
                 :credential-fn identity)]}))

;; The app itself
;; --------------------------------------
(defn app []
  (->
   (c-core/routes site app-routes)
   wrap-params
   wrap-session
   wrap-keyword-params
   (wrap-websocket-handler {:format :edn})
   wrap-friend))
