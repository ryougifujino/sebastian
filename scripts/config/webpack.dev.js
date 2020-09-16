const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar')
const { WEBPACK_PROGRESS_COLOR } = require('../constants')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: 'js/[name].bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WebpackBar({
      name: 'Starting...',
      color: WEBPACK_PROGRESS_COLOR,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      cache: false, // prevent index.html from losing scripts when devServer hot reloads
    }),
  ],
  devServer: {
    hot: true,
    compress: true,
  },
})
