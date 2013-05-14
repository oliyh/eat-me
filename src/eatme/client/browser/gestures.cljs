(ns eatme.browser.gestures)

(defn on-drag-left [el f]
  (.on (js/Hammer. el (clj->js {:drag_min_distance 10
                                :drag_block_horizontal true})) "dragleft" f))

(defn on-drag-right [el f]
  (.on (js/Hammer. el (clj->js {:drag_min_distance 100})) "dragright" f))

(defn to-hammer [action direction]
  (cond
   (nil? direction) action
   (string? direction) (str action direction)
   (keyword? direction) (to-hammer action (name direction))
   (vector? direction) (apply str (interpose " " (mapv (partial to-hammer action) direction)))))

(defn on-swipe
  ([el f] (on-swipe nil el f))
  ([direction el f]
      (-> (js/Hammer. el (clj->js {:swipe_max_touches 1 :swipe_velocity 0.7}))
          (.on (to-hammer "drag" direction) (fn [ev] (-> ev .-gesture .preventDefault)))
          (.on (to-hammer "swipe" direction) f))))

(defn on-drag [el f]
  (on-drag-left el f)
  (on-drag-right el f))
