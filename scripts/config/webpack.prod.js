const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { resolveApp } = require('../utils')
const { WEBPACK_PROGRESS_COLOR } = require('../constants')
const WebpackBar = require('webpackbar')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash].js',
  },
  plugins: [
    new WebpackBar({
      name: 'Building...',
      color: WEBPACK_PROGRESS_COLOR,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      cache: false,
      removeAttributeQuotes: true,
      collapseBooleanAttributes: true,
      collapseInlineTagWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      minifyURLs: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css',
      ignoreOrder: false,
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: true,
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
  },
})
