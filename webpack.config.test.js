const common = require('./webpack.config.common.js');

module.exports = {
  entry: common.getEntry(),
  output: common.getOutput(),
  module: common.getModule({ tsconfig: "tsconfig.prod.json" }),
  resolve: common.getResolve(),
  devtool: "cheap-module-eval-source-map",
  bail: false,
  cache: false
};
