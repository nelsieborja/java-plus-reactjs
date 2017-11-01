var webpack = require("webpack");
var path = require("path");

var BUILD_DIR = path.resolve(__dirname, "../public");
var APP_DIR = path.resolve(__dirname, "./app/js");

var config = {
  entry: APP_DIR + "/index",
  output: {
    path: BUILD_DIR,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: APP_DIR,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react", "stage-2"]
        }
      },
      {
        test: /\.scss$/,
        include: APP_DIR,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          // For auto prefixing
          // {
          //   loader: "postcss-loader"
          // },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;
