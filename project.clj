(defproject eatme "0.0.1-SNAPSHOT"
  :description "Eat what you buy and buy what you eat. An application built on Compojure and Shoreleave"
  :url "https://github.com/oliyh/eat-me"
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [org.clojure/tools.reader "0.7.0"]
                 [compojure "1.1.5" :exclusions [[org.clojure/clojure] [ring/ring-core]]]
                 [lib-noir "0.4.7" :exclusions [[org.clojure/clojure]
                                                [compojure]
                                                [hiccup]
                                                [ring]]]
                 [shoreleave "0.3.0"]
                 [shoreleave/shoreleave-remote "0.3.0"]
                 [shoreleave/shoreleave-remote-ring "0.3.0"]
                 [ring "1.2.0-beta2"]
                 [ring-server "0.2.8" :exclusions [[org.clojure/clojure]
                                                   [ring]]]
                 [ring-refresh "0.1.2" :exclusions [[org.clojure/clojure]
                                                    [compojure]]]
                 [crypto-random "1.1.0"]
                 [amalloy/ring-gzip-middleware "0.1.2" :exclusions [org.clojure/clojure]]
                 [com.cemerick/friend "0.1.5"]
                 [hiccup "1.0.2" :exclusions [org.clojure/clojure]]
                 [hiccups "0.2.0"]
                 [domina "1.0.1"]]
  :dev-dependencies [[lein-marginalia "0.7.1"]]
  :plugins [[lein-ring "0.8.3" :exclusions [org.clojure/clojure]]
            [lein-cljsbuild "0.3.0"]]
  :ring {:handler eatme.handler/war-handler
         :init eatme.handler/init
         :destroy eatme.handler/destroy}
  :cljsbuild {:builds [{:source-paths ["src"]
                        :compiler {:output-dir "resources/build/cljs",
                                   :output-to "resources/public/js/eatme.js",
                                   :externs ["externs/twitter-bootstrap.js"
                                             "externs/jquery-1.9.1.js"]
                                   :optimizations :whitespace ;:simple ;:advanced ;:whitespace
                                   :pretty-print true}}]}
  :profiles {:production
             {:ring {:open-browser? false, :stacktraces? false, :auto-reload? false}}}

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
