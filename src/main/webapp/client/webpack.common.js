// Plugins
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

// Directories
const APP_DIR = path.resolve(__dirname, "./app");
const PUBLIC_DIR = path.resolve(__dirname, "../public");

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
    path: PUBLIC_DIR
  },

  plugins: [
    // Removes build folder(s) before building
    new CleanWebpackPlugin(["public"], {
      // Need to explicitly specify root if output folder is outside root
      root: path.resolve(__dirname, ".."),
      exclude: ["manifest.json", "carrefour.png"],
      verbose: true,
      dry: false
    })
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
