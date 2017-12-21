// Plugins
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// Directories
const APP_DIR = path.resolve(__dirname, "./app");
const SCSS_RESOURCES = path.resolve(__dirname, "./app/scss/resources/*.scss");

module.exports = merge(common, {
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        APP_ENV: JSON.stringify("production")
      }
    }),

    // Scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),

    // Minify JS
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compressor: {
        warnings: false,
        unused: true,
        dead_code: true
      }
    }),

    new webpack.optimize.AggressiveMergingPlugin(),

    // Extract SCSS/CSS from bundle into a file; Including minification
    new ExtractTextPlugin("style.css")
  ],

  module: {
    rules: [
      {
        test: /\.scss$/,
        include: APP_DIR,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true
              }
            },
            "postcss-loader",
            "sass-loader",
            {
              loader: "sass-resources-loader",
              options: {
                // Paths to the files with resources
                resources: SCSS_RESOURCES
              }
            }
          ]
        })
      }
    ]
  }
});
