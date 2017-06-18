const common = require('./webpack.config.common.js');

var _entry = {};
_entry[common.package.name] = './src/' + common.package.name + '.ts';

module.exports = {
  entry: _entry,
  output: common.getOutput(),
  module: common.getModule("tsconfig.prod.json"),
  resolve: common.getResolve(),
  devtool: "cheap-module-eval-source-map",
  bail: false,
  cache: false
};
