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
            [eatme.models.users :as users])
  (:import [java.util UUID]))

(defroutes site

  (friend/logout (ANY "/logout" request (response/redirect "/")))

  (GET "/admin/item-store" [] (cont-site/item-store))

  (GET "/" [] cont-site/new-session)
  (GET "/:basket-id" {session :session basket-id :basket-id} (cont-site/index session))
  (GET "/:basket-id/async" [basket-id] cont-site/ws-handler))

(defroutes app-routes
  (c-route/resources "/")
  (c-route/not-found "404 Page not found."))

(defn wrap-user [handler]
  (fn [req]
    (if-let [auth (friend/current-authentication req)]
      (handler (assoc req :user
                      (merge auth
                             (users/get-user-by-email (:email auth)))))
      (handler req))))

(defn wrap-friend [handler]
  (friend/authenticate
   handler
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
   wrap-friend
   wrap-user
   wrap-params
   wrap-session
   wrap-keyword-params
   (wrap-websocket-handler {:format :edn})))
