const path = require('path');
const package = require('./package.json');

var
  getOutput = function () {
    return {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist/bin'),
      library: package.name,
      libraryTarget: "umd"
    };
  },

  getModule = function (tsconfig) {
    return {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            'awesome-typescript-loader?configFileName=' + tsconfig
          ]
        },
        // {
        //   test: /\.ts$/,
        //   loader: 'tslint-loader',
        //   options: {
        //     configFileName: tsconfig
        //   }
        // },
        // {
        //   test: /\.html$/,
        //   use: "html-loader"
        // },
        // {
        //   test: /\.s?css$/,
        //   use: [
        //     "to-string-loader",
        //     "style-loader",
        //     "css-loader",
        //     "sass-loader"
        //   ]
        // },
        // {
        //   test: /\.s?css$/,
        //   use: ExtractTextPlugin.extract({
        //     fallback: "to-string-loader",
        //     use: [
        //       {
        //         loader: "css-loader",
        //         options: {
        //           sourceMap: true,
        //           importLoaders: true
        //         }
        //       },
        //       {
        //         loader: 'resolve-url-loader',
        //         options: {
        //           sourceMap: true,
        //           keepQuery: true
        //         }
        //       },
        //       {
        //         loader: "sass-loader",
        //         options: {
        //           sourceMap: true
        //         }
        //       }
        //     ]
        //   })
        // },
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
      ]
    };
  },

  getResolve = function (tsconfig) {
    return {
      extensions: [".ts", ".js", ".css", ".scss", ".html"],
      modules: [
        path.resolve(__dirname, 'node_modules')
      ],
      descriptionFiles: ["package.json"]
    };
  };

module.exports = {
  package: package,
  getOutput: getOutput,
  getModule: getModule,
  getResolve: getResolve
};
