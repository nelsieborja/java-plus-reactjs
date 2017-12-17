const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
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
  entry: getEntries(),

  output: {
    // Filename for main entry file
    filename: "[name].min.js",

    // General pattern for chunk files name
    chunkFilename: "[name].min.js",

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
    }),

    new webpack.DefinePlugin({
      "process.env": {
        APP_ENV: JSON.stringify("production")
      }
    }),

    // Label chunks
    new webpack.optimize.CommonsChunkPlugin({
      // children: true,
      name: labelChunkNames
      // minChunks: Infinity
    }),

    // Vendor chunks/common dependencies into separate file
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks({ context }) {
        // var context = module.context;
        return context && context.indexOf("node_modules") >= 0;
      }
    }),

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
};
