(ns eatme.client.main
  (:require [shoreleave.common :as common]
            [shoreleave.browser.history :as history]
            [shoreleave.remotes.http-rpc]
            [shoreleave.pubsubs.simple :as pbus]
            [shoreleave.pubsubs.protocols :as pubsub]
            [shoreleave.pubsubs.publishable :as pcore]
            [domina :as d]
            [domina.events :as event]
            [domina.css :as css]
            [domina.xpath :as x]
            [eatme.client.render :as render]
            [clojure.string :as string]
            [one.browser.history :as history]
            [eatme.browser.gestures :as gestures]
            [eatme.date-utils :as date-utils])
  (:require-macros [shoreleave.remotes.macros :as srm]))

(def query-args (common/query-args-map))
(def hash-args (common/hash-args-map))

;; ### Browser REPL
;; If you add a `repl` as a query-string arg, even on the live site,
;; You can remotely interact with the site from the local REPL
;; Visit: `http://127.0.0.1:8080/test?repl=yes#q=something+else`
(common/toggle-brepl query-args :repl)

(defn- basket-id []
  (when-let [matches (re-matches #".*/#(.*)"
                                 (.-href (.-location js/window)))]
    (last matches)))

(defn to-int [s]
  (js/parseInt s))

(def ^{:private true} bus (pbus/bus))

(def save-basket-button (d/by-id "save-basket-button"))
(def add-item-button (d/by-id "add-item-button"))
(def item-name-field (d/by-id "item-name"))
(def item-qty-field (d/by-id "item-qty"))
(def items-list (d/by-id "items-to-get"))
(def completed-items-list (d/by-id "completed-items"))
(def user-details (d/by-id "user-details"))
(def lookup-recipe (d/by-id "lookup-recipe"))
(def recipe-suggestions (d/by-id "recipe-suggestions"))

(defn mark-basket-unsaved! []
  (-> save-basket-button
      (d/add-class! "btn-primary")
      (x/xpath "i")
      (d/add-class! "icon-white")))

(defn mark-basket-saved! []
  (-> save-basket-button
      (d/remove-class! "btn-primary")
      (x/xpath "i")
      (d/remove-class! "icon-white")))

(defn- serialise-item [state input]
  {:item-name (d/attr input "name")
   :qty (d/value input)
   :state state})

(defn serialise-basket []
  {:id (basket-id)
   :items
   (concat (map (partial serialise-item :list)
                (d/nodes (x/xpath items-list "div/*/input[@rel='qty']")))
           (map (partial serialise-item :basket)
                (d/nodes (x/xpath completed-items-list "div/*/input[@rel='qty']"))))})

(defn load-user-baskets []
  (srm/rpc (api/user-baskets) [baskets]
           :on-success (when (not-empty baskets)
                         (d/set-html! (d/by-id "user-baskets") (render/user-baskets baskets))
                         (d/remove-class! (d/by-id "user-baskets-section") "hide"))
           :on-error (js/alert (str "Error loading user baskets"))))

(def basket-saved (pubsub/publishize (fn [b] b) bus))

(def quantity-changed (pubsub/publishize
                       (fn [direction remove-on-zero? e]
                         {:direction direction
                          :remove-on-zero? remove-on-zero?
                          :item e}) bus))

(def completed-item (pubsub/publishize (fn [row-id] {:row-id row-id}) bus))

(def item-deleted (pubsub/publishize (fn [row-id] {:row-id row-id}) bus))

(def basket-loaded (pubsub/publishize identity bus))

(defn add-item-to-list [the-list item]
  (let [item-row (render/shopping-list-item item)
        row-id (d/attr item-row "id")]
    (d/append! the-list item-row)
    (let [item-row (d/single-node (css/sel (str "#" row-id)))]
      (gestures/on-swipe [:left :right] item-row #(item-deleted row-id))
      (event/listen-once! (css/sel item-row "button[rel=delete-item]") :click #(item-deleted row-id))
      (if (= :list (keyword (:state item)))
        (event/listen-once! (css/sel item-row "button[rel=complete]") :click #(completed-item row-id))
        (d/add-class! (css/sel item-row "button[rel=complete]") "btn-success")))))

(defn set-basket-contents! [basket]
  (d/destroy-children! items-list)
  (d/destroy-children! completed-items-list)
  (when-let [items (not-empty (filter #(= "list" (:state %)) (:items basket)))]
    (doseq [item items]
      (add-item-to-list items-list item)))
  (when-let [items (not-empty (filter #(= "basket" (:state %)) (:items basket)))]
    (doseq [item items]
      (add-item-to-list completed-items-list item))))

(defn no-basket []
  (d/add-class! (d/by-id "share-button") "hide"))

(defn load-basket []
  (if-let [basket-id (basket-id)]
    (srm/rpc
     (api/load-basket basket-id) [basket]
     :on-success (basket-loaded basket)
     :on-error (js/alert (str "Error loading basket: " basket-id)))
    (no-basket)))


(defn nav-handler [{:keys [token navigation? type]}]
  (js/console.log token " " navigation? " " type)
  (when navigation?
    (load-basket)))

(def session-history (history/history nav-handler))

(defn save-basket []
    (srm/rpc
     (api/save-basket (serialise-basket)) [response]
     :on-success (basket-saved response)
     :on-error (js/alert (str "Error saving basket"))))

(def item-added (pubsub/publishize
                 (fn [] {:item-name (d/value item-name-field)
                        :qty (to-int (d/value item-qty-field))
                        :state :list}) bus))

(defn on-enter [e f]
  (when (= 13 (:keyCode e)) (event/prevent-default e) (f)))

(defn on-plus [e f]
  (when (= 43 (:charCode e)) (event/prevent-default e) (f)))

(defn on-minus [e f]
  (when (= 45 (:charCode e)) (event/prevent-default e) (f)))

(event/listen! item-name-field :keypress
               #(on-plus % (partial quantity-changed :inc false item-name-field)))

(event/listen! item-name-field :keypress
               #(on-minus % (partial quantity-changed :dec false item-name-field)))

(defn valid-item-added []
  (when (and (not-empty (d/value item-name-field))
             (not (js/isNaN (to-int (d/value item-qty-field)))))
    (item-added)))

(defn on-length [length e f]
  (when (< (dec length) (count (d/value (event/target e))))
    (f)))

(defn recipe-selected [e]
  (d/remove-class! recipe-suggestions "show")
  (let [ingredients (string/split (d/attr (event/target e) "data-ingredients") #",")]
    (doseq [i ingredients]
      (add-item-to-list items-list {:item-name i :qty 1 :state "list"}))))

(defn show-recipe-suggestions [recipes]
  (d/set-html! recipe-suggestions (render/recipe-suggestions recipes))
  (event/listen-once! (css/sel recipe-suggestions "li > a") :click #(recipe-selected %))
  (d/add-class! recipe-suggestions "show"))

(defn checked? [input]
  (.-checked input))

(defn suggest-recipe []
  (when (checked? lookup-recipe)
    (srm/rpc
     (api/suggest-recipe (d/value item-name-field) 1) [response]
     :on-success (show-recipe-suggestions response)
     :on-error (js/alert (str "Error looking up recipe")))))

(event/listen! add-item-button :click #(valid-item-added))
(event/listen! item-name-field :keypress #(on-enter % valid-item-added))
(event/listen! item-name-field :keypress #(on-length 4 % suggest-recipe))
(event/listen! item-qty-field :keypress #(on-enter % valid-item-added))
(event/listen! save-basket-button :click #(save-basket))

(defn item-completed [{:keys [row-id]}]
  (let [item-row (css/sel (str "#" row-id))]
    (d/add-class! (css/sel item-row (str "button[rel=complete]")) "btn-success")
    (d/append! completed-items-list (d/detach! item-row))))

(defn remove-item-from-list [{:keys [row-id]}]
  (d/detach! (css/sel (str "#" row-id))))

(defn adjust-quantity [direction value]
  (condp = direction
    :inc (inc value)
    :dec (dec value)))

(defn change-quantity [{:keys [item direction remove-on-zero?]}]
  (let [qty (-> item (x/xpath "../../*/input[@rel='qty']"))
        new-value (adjust-quantity direction (to-int (d/value qty)))]
    (if (< 0 new-value)
      (d/set-value! qty new-value)
      (when remove-on-zero?
        (item-deleted item)))))

(defn focus-item-input [& args]
  (.focus item-name-field))

(defn clear-item-input [& args]
  (d/set-value! item-name-field "")
  (d/set-value! item-qty-field 1))

(defn log-to-console [event o]
  (js/console.log event ": " o))

(defn display-user-details []
  (srm/rpc
     (api/user-details) [details]
     :on-success (do (when details
                       (d/set-html! user-details (render/user-button details)))
                     (load-user-baskets))
     :on-error (js/alert (str "Error loading user details"))))

(def email-link "mailto:?subject=My%20Shopping%20Basket&body=")

(defn update-share-modal [{:keys [id url]}]
  (d/remove-class! (d/by-id "share-button") "hide")
  (d/set-html! (d/by-id "share-qr-code") (render/qr-code-image url))
  (d/set-attr! (d/by-id "share-link") "href" url)
  (d/set-html! (d/by-id "share-link") url)
  (d/set-attr! (d/by-id "share-email") "href" (str email-link url)))

(defn update-basket-saved-time [{timestamp :timestamp}]
  (d/set-html! (d/by-id "last-saved")
               (str "Last saved " (date-utils/friendly-age timestamp))))

(pubsub/subscribe bus item-added (partial add-item-to-list items-list))
(pubsub/subscribe bus item-added mark-basket-unsaved!)
(pubsub/subscribe bus item-added (partial log-to-console "Item added"))
(pubsub/subscribe bus item-added focus-item-input)
(pubsub/subscribe bus item-added clear-item-input)

(pubsub/subscribe bus item-deleted (partial log-to-console "Item deleted"))
(pubsub/subscribe bus item-deleted remove-item-from-list)
(pubsub/subscribe bus item-deleted mark-basket-unsaved!)

(pubsub/subscribe bus quantity-changed change-quantity)
(pubsub/subscribe bus quantity-changed mark-basket-unsaved!)

(pubsub/subscribe bus completed-item item-completed)
(pubsub/subscribe bus completed-item mark-basket-unsaved!)

(pubsub/subscribe bus basket-saved mark-basket-saved!)
(pubsub/subscribe bus basket-saved load-user-baskets)
(pubsub/subscribe bus basket-saved (partial log-to-console "Basket saved"))
(pubsub/subscribe bus basket-saved (fn [b] (history/set-token session-history (str (:id b)))))
(pubsub/subscribe bus basket-saved update-share-modal)
(pubsub/subscribe bus basket-saved update-basket-saved-time)

(pubsub/subscribe bus basket-loaded set-basket-contents!)
(pubsub/subscribe bus basket-loaded update-share-modal)
(pubsub/subscribe bus basket-loaded update-basket-saved-time)
(pubsub/subscribe bus basket-loaded mark-basket-saved!)
(pubsub/subscribe bus basket-loaded (partial log-to-console "Basket loaded"))


(display-user-details)
(load-basket)
(focus-item-input)
