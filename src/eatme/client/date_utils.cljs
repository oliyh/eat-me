(ns eatme.date-utils)

(defn humanise [timestamp]
  (.toLocaleFormat (js/Date. timestamp)))

(defn friendly-age [timestamp]
  (let [seconds (/ (- (js/Date.) (js/Date. timestamp)) 1000)
        minutes (/ seconds 60)
        hours (/ minutes 60)
        days (/ hours 24)
        weeks (/ days 7)]
    (cond
     (> 60 seconds) "less than a minute ago"
     (= 1 (int minutes)) "a minute ago"
     (> 1 hours) (str (int minutes) " minutes ago")
     (> 1 days) (str "about " (int hours) " hours ago")
     (> 1 weeks) (str "about " (int days) " days ago")
     :else (str "about " (int weeks) " weeks ago"))))
