(ns eatme.controllers.site)

(defn index [session]
  (slurp "resources/public/html/shopping-list.html"))

(defn test-shoreleave []
  (slurp "resources/public/html/test.html"))

