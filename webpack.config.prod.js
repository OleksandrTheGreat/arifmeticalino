const common = require('./webpack.config.common.js');
const CopyPlugin = require('xwebpack/CopyPlugin.js');

module.exports = {
  entry: common.getEntry(),
  output: common.getOutput(),
  module: common.getModule({ tsconfig: "tsconfig.prod.json" }),
  resolve: common.getResolve(),
  plugins: [
    new CopyPlugin({
      from: common.folders.build + '/app/app.html',
      to: common.folders.bin + '/index.html'
    })
  ],
  devtool: "source-map",
  bail: true,
  cache: false
};
