const common = require('./webpack.config.common.js');
const CopyPlugin = require('xwebpack/CopyPlugin.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var

  tsconfig = "tsconfig.prod.json",

  plugins = [
    new CopyPlugin({
      from: common.folders.build + "/app/index.html",
      to: common.folders.bin + '/index.html'
    }),
    // new HtmlWebpackPlugin(),
    new ExtractTextPlugin({
      filename: 'styles/index.css',
      allChunks: true
    }),
    new CopyPlugin({
      from: common.folders.root + "/node_modules/bootstrap/dist/css/bootstrap.min.css",
      to: common.folders.bin + '/styles/bootstrap.min.css'
    }),
    new CopyPlugin({
      from: common.folders.root + "/node_modules/bootstrap/dist/fonts",
      to: common.folders.bin + '/fonts'
    })
  ],

  rules = [
    // {
    //   test: /\.ts$/,
    //   loader: 'tslint-loader',
    //   options: {
    //     configFileName: tsconfig
    //   }
    // },
    {
      test: /\.html$/,
      use: "html-loader"
    },
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
    },
    // {
    //   test: /\.(gif|png|jpe?g|svg)$/i,
    //   use: [
    //     'url-loader?name=/assets/images/[hash].[ext]',
    //     'image-webpack-loader?{optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}, mozjpeg: {quality: 65}}'
    //   ]
    // },
    // {
    //   test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    //   use: 'url-loader?limit=10000&mimetype=application/font-woff&name=/assets/fonts/[name].[ext]'
    // },
    // {
    //   test: /\.(ttf|eot|otf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    //   use: 'url-loader?name=/assets/fonts/[name].[ext]'
    // }
  ];

module.exports = {
  entry: common.getEntry(),
  output: common.getOutput(),
  module: common.getModule({ tsconfig: tsconfig, rules: rules }),
  resolve: common.getResolve(),
  plugins: common.getPlugins({ plugins: plugins }),
  devtool: "source-map",
  bail: true,
  cache: false
};
