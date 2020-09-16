const { merge } = require('webpack-merge')
const productionConfig = require('./webpack.prod')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = merge(productionConfig, {
  plugins: [new BundleAnalyzerPlugin()],
})
