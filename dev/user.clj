(ns user
  (:require [clojure.java.io :as io]
            [clojure.java.javadoc :refer (javadoc)]
            [clojure.pprint :refer (pprint print-table)]
            [clojure.reflect :refer (reflect)]
            [clojure.repl :refer (apropos dir doc find-doc pst source)]
            [clojure.set :as set]
            [clojure.string :as str]
            [clojure.test :as test]
            [clojure.tools.namespace.repl :refer (refresh refresh-all)]
            [clojure.tools.trace :refer (trace deftrace trace-forms trace-ns trace-vars)]
            [com.stuartsierra.component :as component]
            [eatme.bootstrap :as eatme]))

(defn start []
  (eatme/bootstrap))

(defn stop []
  (when eatme/system
    (component/stop eatme/system)))

(defn reset []
  (stop)
  (refresh :after 'user/start))
