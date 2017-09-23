const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = require('./webpack.config.js');

const extension = {
  devtool: 'source-map'
};

const prodConfig = Object.assign({}, extension, config);

// Clears webapp/build folder
const cleanWebpack = new CleanWebpackPlugin([
    path.resolve(__dirname, '..', 'build')
  ], {
    root: path.resolve(__dirname, '..')
  });

prodConfig.plugins.splice(0, 0, cleanWebpack);

module.exports = prodConfig;
