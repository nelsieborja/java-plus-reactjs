const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const fs = require("fs");

const APP_DIR = path.resolve(__dirname, "./app");
const LABELS_DIR = path.resolve(__dirname, "./app/labels");
const SCSS_RESOURCES = path.resolve(__dirname, "./app/scss/resources/*.scss");

let labelChunkNames = [];
function getEntries() {
  const entries = fs
    .readdirSync(LABELS_DIR)
    .filter(file => file.match(/^(?!(index)).*$/))
    .reduce((labels, file) => {
      labels[file.substring(0, file.length - 3)] = LABELS_DIR + "/" + file;
      return labels;
    }, {});

  // Get label names
  labelChunkNames = Object.keys(entries);

  // Add main file
  entries.app = APP_DIR + "/index";

  return entries;
}

module.exports = {
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

  entry: getEntries(),

  output: {
    // Filename for main entry file
    filename: "[name].min.js",

    // General chunk pattern
    chunkFilename: "[name].js",

    // Required by Webpack for outputting bundle/chunks
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
    new CleanWebpackPlugin(["public"], {
      // Need to explicitly specify root if output folder is outside root
      root: path.resolve(__dirname, ".."),
      verbose: true
    }),

    // Prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    // Enable HMR globally; Generate hot update chunks
    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      "process.env": {
        APP_ENV: JSON.stringify("development")
      }
    }),

    // Label chunks
    new webpack.optimize.CommonsChunkPlugin({
      // children: true,
      name: labelChunkNames
      // minChunks: Infinity
    }),

    // Vendor chunks
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks({ context }) {
        // var context = module.context;
        return context && context.indexOf("node_modules") >= 0;
      }
    })
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

      // Transpiling JS files using babel and webpack
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
};
