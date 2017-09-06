const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "./dist/[name].css",
  allChunks: true
});

module.exports = {
  context: __dirname,
  entry: {
    main: "./src/rnav.ts",
    style: "./sass/all.sass"
  },
  output: {
    filename: "[name].js",
    path: __dirname + "./dist",
    library: "[name]"
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader?url=false"
            },
            {
              loader: "sass-loader?sourceMap"
            }
          ],
          fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [
    extractSass,
    new HtmlWebpackPlugin({
      template: "./dist/index.html",
      cache: false
    })
  ],
  devServer: {
    port: 2992,
    contentBase: "./dist"
  }
};
