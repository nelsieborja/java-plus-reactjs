// Plugins
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

// Directories
const APP_DIR = path.resolve(__dirname, "./app");
const SCSS_RESOURCES = path.resolve(__dirname, "./app/scss/resources/*.scss");

module.exports = merge(common, {
  devServer: {
    // If template file (usually index.html) is in a different folder,
    // make sure to set the ff
    contentBase: APP_DIR,

    // Enable HMR in webpack-dev-server and in libs running in the browser
    hot: true,

    // Client port to be used by webpack-dev-server
    port: 3001,

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
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development")
      }
    }),

    // Prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    // Enable HMR globally; Generate hot update chunks
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    rules: [
      // Tell Webpack to detect errors/warnings but should still be able to build (but with warnings)
      {
        enforce: "pre", // specify as pre-loader; lint files not modified by other loaders (like babel-loader)
        test: /\.js$/,
        include: APP_DIR,
        loader: "eslint-loader",
        options: {
          emitWarning: true, // instruct eslint-loader to output errors/warning in the console
          configFile: "./.eslintrc.json" // points loader to ESLint config file
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
          // After installing ESLint, needed to add config here,
          // thus config file (.postcssrc) is no longer in used
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                /* PostCSS Plugins */
              ]
            }
          },

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
});

// entry: {
//   // Activate HMR for React - I guess same as module.hot.accept?
//   // Will dig into deep for this later
//   // "react-hot-loader/patch",

//   // Bundle the client for webpack-dev-server
//   // and connect to the provided endpoint;
//   // Enables websocket connection (needs url and endpoint)
//   // "webpack-dev-server/client?http://localhost:3000",

//   // Bundle the client for hot reloading
//   // only- means to only hot reload for successful updates
//   // "webpack/hot/only-dev-server",
//   // it reloads the entire browser if there's any issue
//   // "webpack/hot/dev-server",

//   // The entry point of our app
//   app: APP_DIR + "index"
// },

// Testing SW in local
// http://deanhume.com/home/blogpost/testing-service-workers-locally-with-self-signed-certificates/10155
