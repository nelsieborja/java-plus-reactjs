// Plugins
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

// Directories
const APP_DIR = path.resolve(__dirname, "./app");
const SCSS_RESOURCES = path.resolve(__dirname, "./app/scss/resources/*.scss");
const PUBLIC_DIR = path.resolve(__dirname, "../public");

module.exports = merge(common, {
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || "production")
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
    new ExtractTextPlugin("style.css"),

    // Offline Support
    new WorkboxPlugin({
      globDirectory: PUBLIC_DIR,
      // globPatterns: ["**/*.{html,js}"], // Set specific file pattern to cache
      swDest: path.join(PUBLIC_DIR, "sw.js"),
      // Instructs the latest service worker to take control of all clients as soon as it's activated
      clientsClaim: true,
      //  Instructs the latest service worker to activate as soon as it enters the waiting phase
      skipWaiting: true,
      // Usually for APIs
      runtimeCaching: [
        {
          urlPattern: new RegExp("https://www.carrefouruae.com"),
          handler: "staleWhileRevalidate"
        }
      ]
    })
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
