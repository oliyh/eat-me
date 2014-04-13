(ns eatme.main
  (:gen-class))

(defn -main [& args]
  (require 'eatme.bootstrap)
  ((resolve 'eatme.bootstrap/bootstrap)))
