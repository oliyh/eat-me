(ns eatme.main
  (:gen-class))

(defn -main [& args]
  (require 'eatme.bootstrap)
  (apply (resolve 'eatme.bootstrap/bootstrap) args))
