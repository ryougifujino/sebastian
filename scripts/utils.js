const { PROJECT_PATH, isDev } = require('./constants')
const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const getStyleLoaders = (cssOptions, preProcessor) =>
  [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        sourceMap: isDev,
        ...cssOptions,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          ident: 'postcss',
          plugins: [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                grid: true,
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
            require('postcss-normalize'),
          ],
        },
        sourceMap: isDev,
      },
    },
    preProcessor && {
      loader: preProcessor,
      options: {
        sourceMap: isDev,
      },
    },
  ].filter(Boolean)

const getAssetRule = (test, extraOptions) => ({
  test,
  use: [
    {
      loader: 'url-loader',
      options: {
        name: '[name].[contenthash].[ext]',
        ...extraOptions,
      },
    },
  ],
})

const getCSSModuleLocalIdent = (function () {
  const devIdent = '[path][name]__[local]--[hash:base64:5]'
  const prodIdent = '[local]--[hash:base64:5]'
  return function () {
    return isDev ? devIdent : prodIdent
  }
})()

const resolveApp = (relativePath) => resolve(PROJECT_PATH, relativePath)

module.exports = {
  getStyleLoaders,
  getAssetRule,
  getCSSModuleLocalIdent,
  resolveApp,
}
