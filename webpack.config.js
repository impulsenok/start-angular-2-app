const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const helpers = require("./config/client_config/helpers");
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const CopyWebpackPlugin  = require('copy-webpack-plugin');


module.exports = {
    entry:
    {
        "polyfills": "./src/polyfills.ts",
        "vendor": "./src/vendor.ts",
        "app": "./src/main.ts",
    },

    resolve: {
        extensions: [
            ".js", ".ts"
        ]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [ "ts-loader?configFileName=/tsconfig.json", "angular2-template-loader" ]
            },
            {
                test: /\.html$/,
                use: "html-loader"
            },
            {
                test: /\.pug$/,
                use: [ "raw-loader", "pug-html-loader" ]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [ "raw-loader", "sass-loader" ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|otf|ttf|eot|ico)$/,
                use: "file-loader?name=[path]/[name].[hash].[ext]"
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'file-loader?name=[path]/[name].[ext]'
            },
            {
                test: /\.css$/,
                exclude: helpers.root("src", "app"),
                use: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader" })
            },
            {
                test: /\.css$/,
                include: helpers.root("src", "app"),
                use: "raw-loader"
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: [ "app", "vendor", "polyfills" ]
        }),

        new HtmlWebpackPlugin({
            template: "src/index.html"
        }),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),


        // Workaround for Angular-SystemJS-Webpack(2) WARNINGS
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('/src'), // location of your src
            {
                // your Angular Async Route paths relative to this root directory
            }
        ),


        new CopyWebpackPlugin([
            { from: 'src/assets/images/', to: 'images/' },
            { from: 'src/assets/styles/css/bootstrap.min.css', to: 'styles/' }
        ])
    ]
};