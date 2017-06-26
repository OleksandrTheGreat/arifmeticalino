const common = require('./webpack.config.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var _module = common.getModule({ tsconfig: "tsconfig.prod.json" });
_module.rules.push(
  {
    test: /\.s?css$/,
    use: ExtractTextPlugin.extract({
      fallback: "to-string-loader",
      use: [
        {
          loader: "css-loader",
          options: {
            sourceMap: true,
            importLoaders: true
          }
        },
        {
          loader: "sass-loader",
          options: {
            sourceMap: true
          }
        }
      ]
    })
  });

module.exports = {
  entry: common.getEntry(),
  output: common.getOutput(),
  module: _module,
  resolve: common.getResolve(),
  plugins: [
    new HtmlWebpackPlugin(),
    new ExtractTextPlugin({
      filename: 'index.css',
      allChunks: true
    })
  ],
  devtool: "source-map",
  bail: true,
  cache: false
};
