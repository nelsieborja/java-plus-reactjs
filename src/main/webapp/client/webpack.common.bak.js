const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const fs = require("fs");

const APP_DIR = path.resolve(__dirname, "./app");
const LABELS_DIR = path.resolve(__dirname, "./app/labels");

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
  entry: {
    app: APP_DIR + "/index"
  },
  // entry: getEntries(),

  output: {
    // Filename for main entry file
    filename: "[name].min.js",

    // General pattern for chunk files name
    chunkFilename: "[name].chunk.js",

    // Required by Webpack for outputting bundle/chunks
    publicPath: "/public/",

    // Output folder
    path: path.resolve(__dirname, "../public")
  },

  plugins: [
    // Removes build folder(s) before building
    new CleanWebpackPlugin(["public"], {
      // Need to explicitly specify root if output folder is outside root
      root: path.resolve(__dirname, ".."),
      verbose: true
    })

    // Label chunks
    // new webpack.optimize.CommonsChunkPlugin({
    //   // children: true,
    //   name: labelChunkNames
    //   // minChunks: Infinity
    // })

    // Vendor chunks
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "vendor",
    //   minChunks({ context }) {
    //     // var context = module.context;
    //     return context && context.indexOf("node_modules") >= 0;
    //   }
    // })
  ],

  module: {
    rules: [
      // Transpiling JS files using babel and webpack
      {
        test: /\.js$/,
        include: APP_DIR,
        loader: "babel-loader",
        query: {
          // stage-2: to get rid of method binding from component class
          presets: ["es2015", "react", "stage-2"]
        }
      }
    ]
  }
};
