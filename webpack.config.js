const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("path");
const WebpackPwaManifest = require("webpack-pwa-manifest");

const config = {
// add plugins to direct webpack on what to do
// even though jquery package is added, we need to write in plugin
plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    }),
    new BundleAnalyzerPlugin({
        // the report outputs to an HTML called report.html in the dist folder
        // can set to disable to temp. stop reporting and opening of report 
        analyzerMode: "static",
    }),
    // new invokes a contructor function
    new WebpackPwaManifest({
        publicPath: '/' ,
        name: "Food Event",
        short_name: "Foodies",
        description: "An app that allows you to view upcoming food events.",
        start_url: "../index.html",
        background_color: "#01579b",
        theme_color: "#ffffff",
        // specific to manifest plugin
        // fingerprints tell webpack if it should generate unique fingerprints per generated manifest
        fingerprints: false,
        // decides whether the link is added to html
        inject: false,
        icons: [{
            // path to the icon image
            // destination is where icons sent after creation of web manifest
          src: path.resolve("assets/img/icons/icon-512x512.png"),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join("assets", "icons")
        }]
      })
],
// root of the bundle and beginning of dependency graph, gives relative path of code
entry: {
    app: "./assets/js/script.js",
    events: "./assets/js/events.js",
    schedule: "./assets/js/schedule.js",
    tickets: "./assets/js/tickets.js"
},
//  takes bundles code and puts in specified folder
output: {
    path: __dirname + "/dist",
    // name from key name from value pair in entry object
    filename: "[name].bundle.js"
},
module: {
    rules: [
        {
            // processes any image file with .jpg 
            test: /\.jpg$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name (file) {
                            return "[path][name].[ext]"
                        },
                        publicPath: function(url) {
                            return url.replace("../", "/assets/")
                        },
                        esModule: false
                    }
                },
                {
                loader: 'image-webpack-loader'
                }
            ]
        }
    ]
},
// the mode we want the webpack to run in, production is default
mode: 'development'
};

module.exports = config;