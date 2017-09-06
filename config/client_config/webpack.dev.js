const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const commonConfig = require("../../webpack.config.js");
const helpers = require("./helpers");

module.exports = webpackMerge(commonConfig, {
    devtool: "cheap-module-eval-source-map",

    output: {
        path: helpers.root("../public"),
        publicPath: "/",
        filename: "[name].js",
        chunkFilename: "[id].chunk.js"
    },

    plugins: [
        new ExtractTextPlugin({
            filename: "[name].css",
            disable: false,
            /*allChunks: true,
            filename:  (getPath) => {
                return getPath('css/[name].css').replace('css/js', 'css');
            }*/
        }),
        new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            mangle: {
                keep_fnames: true
            }
        })
    ],

    devServer: {
        historyApiFallback: true,
        stats: "minimal"/*,
        TODO setup when REST service ready
        proxy: {
            "/api/**": {
                target: "http://localhost:8080/nurdbot-rest-service",
                secure: false,
                changeOrigin: true
            }
        }*/
    }
});