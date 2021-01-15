const path = require("path");
const webpack = require("webpack");
module.exports = {
// add plugins to direct webpack on what to do
// even though jquery package is added, we need to write in plugin
plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    }),
],
// root of the bundle and beginning of dependency graph, gives relative path of code
entry: './assets/js/script.js',
//  takes bundles code and puts in specified folder
output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js'
},
// the mode we want the webpack to run in, production is default
mode: 'development'
};