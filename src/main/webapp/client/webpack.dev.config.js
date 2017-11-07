const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const BUILD_DIR = path.resolve(__dirname, "../public");
const APP_DIR = path.resolve(__dirname, "./app");
const SCSS_RESOURCES = path.resolve(__dirname, "./app/scss/resources/*.scss");

module.exports = {
  entry: [
    // Activate HMR for React - I guess same as module.hot.accept?
    // Will dig into deep for this later
    // "react-hot-loader/patch",

    // Bundle the client for webpack-dev-server
    // and connect to the provided endpoint;
    // Enables websocket connection (needs url and endpoint)
    // "webpack-dev-server/client?http://localhost:3000",

    // Bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    // "webpack/hot/only-dev-server",
    // it reloads the entire browser if there's any issue
    // "webpack/hot/dev-server",

    // The entry point of our app
    APP_DIR + "/index"
  ],

  output: {
    // Will output bundle.js
    filename: "bundle.js",

    // Path of output files
    path: BUILD_DIR,

    // Required for webpack-dev-server
    publicPath: "/public/"
  },

  devServer: {
    // If template file (usually index.html) is in a different folder,
    // make sure to set the ff
    contentBase: APP_DIR,

    // Enable HMR in webpack-dev-server and in libs running in the browser
    hot: true,

    // Client port to be used by webpack-dev-server
    port: 3000,

    // Since we used backend server as both API and Web Server
    // and template file serves from backend server
    // we need to get this HTML by proxying everything with a "*" star
    proxy: {
      "*": "http://localhost:8080"
    }
  },

  // For error referencing to correct file and the code line number
  devtool: "inline-source-map",

  plugins: [
    // Removes build folder(s) before building
    new CleanWebpackPlugin(["public"]),

    // Prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    // Enable HMR globally; Generate hot update chunks
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: APP_DIR,
        loader: "babel-loader",
        query: {
          // stage-2: to get rid of method binding from component class
          presets: ["es2015", "react", "stage-2"]
        }
      },
      {
        test: /\.scss$/,
        include: APP_DIR,
        use: [
          // Insert styles into the DOM
          "style-loader",

          // Resolves all imports and url()
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },

          // For auto prefixing
          "postcss-loader",

          // Compiles sass to css
          "sass-loader",

          // @import SCSS resources into every required SCSS module
          {
            loader: "sass-resources-loader",
            options: {
              // Paths to the files with resources
              resources: SCSS_RESOURCES
            }
          }
        ]
      }
    ]
  }
};
