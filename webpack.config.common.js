const path = require('path');
const package = require('./package.json');
const copy = require('xfs/copy.js');
const mkdir = require('xfs/mkdir.js');
const fs = require('fs');

var

  folders = {
    build: path.resolve(__dirname, 'dist/build'),
    dist: path.resolve(__dirname, 'dist/bin')
  },

  prepack = function () {

    var
      copyPackageJson = function () {
        mkdir.sync(folders.dist);
        copy.sync("./package.json", folders.dist + '/package.json');
      },
      bundleDts = function (targetDirPath) {

        var 
          files = fs.readdirSync(targetDirPath),
          dtsBundlePath = folders.dist + '/index.d.ts';

        files.forEach((item) => {

          var
            itemPath = targetDirPath + '/' + item, 
            stat = fs.statSync(itemPath);

          if (stat.isDirectory())
            bundleDts(itemPath);

          if (item.indexOf('.d.ts') < 0 || item == 'index.d.ts')
            return;

          fs.appendFileSync(dtsBundlePath, fs.readFileSync(itemPath));
        });
      };

    copyPackageJson();
    bundleDts(folders.build);
  },

  getEntry = function (entry) {

    if (entry)
      return entry;

    return folders.build + '/index.ts';
  },

  getOutput = function () {
    return {
      filename: package.main,
      path: folders.dist,
      library: package.name,
      libraryTarget: "umd"
    };
  },

  getModule = function (settings) {
    return {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            'awesome-typescript-loader?configFileName=' + settings.tsconfig
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

  getResolve = function () {
    return {
      extensions: [".ts", ".js", ".css", ".scss", ".html"],
      modules: [
        path.resolve(__dirname, 'node_modules')
      ],
      descriptionFiles: ["package.json"]
    };
  };

prepack();

module.exports = {
  package: package,
  getEntry: getEntry,
  getOutput: getOutput,
  getModule: getModule,
  getResolve: getResolve
};
