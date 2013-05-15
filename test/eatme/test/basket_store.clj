(ns eatme.test.basket-store
  (:use [clojure.test])
  (:require [eatme.basket-store :as bs]))

(defn basket-with [& qty-items]
  {:items
   (for [[qty item-name state] (partition 3 qty-items)]
     {:item-name item-name :qty qty :state (name state)})})

(defn item [qty item-name state]
  {:item-name item-name :qty qty :state (name state)})

(defn list-item [qty name]
  (item qty name :list))

(defn compl-item [qty name]
  (item qty name :basket))

(deftest normalises-basket
  (testing "a single item is unchanged"
    (let [basket {:items [(list-item 3 "oranges")]}]
      (is (= basket (bs/normalise-basket basket)))))
  (testing "quantities are added for duplicate item names"
    (let [basket {:items [(list-item 4 "apples") (list-item 6 "apples")]}]
      (is (= {:items [{:item-name "apples" :qty 10 :state "list"}]} (bs/normalise-basket basket)))))
  (testing "item is conflicted if states are different"
    (let [basket {:items [(list-item 4 "apples") (compl-item 6 "apples")]}]
      (is (= {:items [{:item-name "apples" :qty 10 :state "conflict"}]} (bs/normalise-basket basket))))))

(deftest merges-baskets
  (testing "identical items are unchanged"
    (let [a (basket-with 2 "apples" :list)]
      (is (= a (bs/merge-baskets a a)))))
  (testing "completed state wins if all else equal"
    (let [a (basket-with 4 "oranges" :list)
          b (basket-with 4 "oranges" :basket)]
      (is (= b (bs/merge-baskets b a))))))
