const { PROJECT_PATH, isDev } = require('./constants')
const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const getStyleLoaders = (importLoaders, preProcessor) =>
  [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        sourceMap: isDev,
        importLoaders,
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

const resolveApp = (relativePath) => resolve(PROJECT_PATH, relativePath)

module.exports = {
  getStyleLoaders,
  getAssetRule,
  resolveApp,
}
