(ns eatme.middleware
  (:require [cemerick.friend :as friend]
            [cemerick.friend.openid :as openid]
            ))

(defn get-handler [app]
  (-> app



      (ring.middleware.file-info/wrap-file-info)
      (hiccup.middleware/wrap-base-url)))
