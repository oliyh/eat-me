(ns eatme.item-library
  (:use [eatme.config :only [config]])
  (:require [clj-http.client :as client]
            [clojure.string :as string]
            [clojure.set :refer [rename-keys]]))

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
                                   :as :json
                                   :insecure? true}))))

(defn login
  ([] (login user))
  ([user] (reset! session (call-api :login user))))

(defn search
  ([q] (search q 1))
  ([q p] (:Products (call-api :productsearch {:searchtext q :page p}))))

(def products->eatme
  {:UnitPrice :price
   :Name :name
   :ProductId :product-id})

(def categories->eatme
  {:Id :id
   :Name :name
   :Departments :departments
   :Aisles :aisles
   :Shelves :shelves
   :UnitPrice :price})

(defn c->eatme [m]
  (rename-keys m categories->eatme))

(defn p->eatme [m]
  (rename-keys (select-keys m (keys products->eatme)) products->eatme))

(defn categories []
  (rename-keys (call-api :listproductcategories) categories->eatme))

(defn products [category-id]
  (map p->eatme
       (:Products (call-api :listproductsbycategory {:category category-id}))))

;; login and get a session id
(defn init []
  (login))

(defn- id-name [o]
  (select-keys o [:id :name]))

(defn all-shelves []
  (for [dept (map c->eatme (:departments (categories)))
        aisle (map c->eatme (:aisles dept))
        shelf (map c->eatme (:shelves aisle))]
    {:dept (id-name dept) :aisle (id-name aisle) :shelf (id-name shelf)}))
