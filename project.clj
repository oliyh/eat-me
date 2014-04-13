(defproject eatme "0.0.2-SNAPSHOT"
  :description "Eat what you buy and buy what you eat. An application built on Compojure and Shoreleave"
  :url "https://github.com/oliyh/eat-me"
  :min-lein-version "2.0.0"
  :uberjar-name "eatme-standalone.jar"
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/tools.logging "0.2.6"]
                 [com.stuartsierra/component "0.2.1"]
                 [compojure "1.1.5" :exclusions [[org.clojure/clojure] [ring/ring-core]]]
                 [com.novemberain/monger "1.7.0"]
                 [clj-http "0.7.2"]
                 [clj-time "0.5.0"]

                 [http-kit "2.1.16"]
                 [org.clojure/data.json "0.2.3"]
                 [ring/ring-core "1.2.0"]
                 [liberator "0.11.0" :exclusions [org.clojure/tools.logging]]
                 [com.cemerick/friend "0.1.5"]
                 [hiccup "1.0.5" :exclusions [org.clojure/clojure]]

                 [org.clojure/clojurescript "0.0-2173"]
                 [jarohen/chord "0.2.2" :exclusions [http-kit]]
                 [prismatic/dommy "0.1.2"]
                 [om "0.5.3"]
                 [sablono "0.2.15"]
                 [secretary "1.1.0"]
                 [org.clojure/core.async "0.1.278.0-76b25b-alpha"]]
  :resource-paths ["resources"]
  :cljsbuild {:builds [{:source-paths ["src-cljs"]
                        :compiler {:output-dir "resources/public/cljs",
                                   :output-to "resources/public/js/eatme.js",
                                   :externs ["externs/twitter-bootstrap.js"
                                             "externs/jquery-1.9.1.js"
                                             "resources/public/js/hammer-1.0.5.min.js"]
                                   :optimizations :whitespace ;:simple ;:advanced ;:whitespace
                                   :pretty-print true}}]}
  :profiles {:dev {:source-paths ["dev"]
                   :dependencies [[org.clojure/tools.trace "0.7.6"]
                                  [org.clojure/tools.namespace "0.2.4"]]
                   :plugins [[lein-cljsbuild "0.3.2"]]}}
  :repl-options {:init-ns user}
  :jvm-opts ["-Dlog.dir=logs"]
  :warn-on-reflection false
  ;:run-aliases {}
  :main eatme.server

  ; Different JVM options for performance
  ;:jvm-opts ["-Xmx1g"]
  ;:jvm-opts ["-server" "-XX:+UseConcMarkSweepGC" "-XX:+UseParNewGC" "-XX:+UseCompressedOops"]
  ;:jvm-opts ["-server" "-Xmx1g" "-XX:+UseConcMarkSweepGC" "-XX:+UseParNewGC" "-XX:+UseCompressedOops"]
  ;:jvm-opts ["-server" "-Xmx50mb" "-XX:+UseConcMarkSweepGC" "-XX:+UseParNewGC" "-XX:+UseCompressedOops"]
  ;
  ; -XX:+UnlockExperimentalVMOptions -XX:+UseG1GC -XX:MaxGCPauseMillis =50 -XX:+G1ParallelRSetUpdatingEnabled -XX:+G1ParallelRSetScanningEnabled
  ;  -XX:+AggressiveOpts -XX:CompileThreshold=500 -XX:+UseFastAccessorMethods -XX:+OptimizeStringConcat -XX:+UseCompressedStrings -XX:+UseCompressedOops
)
