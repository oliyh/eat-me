(ns eatme.item-library
  (:use [eatme.config :only [config]])
  (:require [clj-http.client :as client]
            [clojure.string :as string]))

(def tesco-api "https://secure.techfortesco.com/groceryapi/restservice.aspx")

(defn- get-app []
  {:developerkey  (config :tesco_devkey)
   :applicationkey (config :tesco_appkey)})

(def app (memoize get-app))

;; logs in as "Mrs. Anonymously-Loggedin" and works. yay!
(def user {:email ""
           :password ""})

(defonce session (atom {}))

(defn- to-command [command]
  (string/upper-case (name command)))

(defn call-api
  ([command] (call-api command {}))
  ([command params]
     (:body (client/get tesco-api {:query-params (merge {:command (to-command command)
                                                         :sessionkey (:SessionKey @session)
                                                         :page 1} (app) params)
                                   :as :json}))))

(defn login
  ([] (login user))
  ([user] (reset! session (call-api :login user))))

(defn search
  ([q] (search q 1))
  ([q p] (call-api :productsearch {:searchtext q :page p})))

;; login and get a session id
(defn init []
  (login))

;; useful commands
;; LISTPRODUCTCATEGORIES - Lists the departments, aisles and shelves in a nested format
;; LISTPRODUCTSBYCATEGORY - Lists the products for a given shelf (provided by ListProductCategories. Now with new parameter EXTENDEDINFO=Y
