const CopyPlugin = require('copy-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const webpack = require('webpack')
const { getStyleLoaders, getAssetRule, getCSSModuleLocalIdent, resolveApp } = require('../utils')
const { PROJECT_PATH } = require('../constants')

const cssRegex = /\.css$/
const lessRegex = /\.less$/
const lessGlobalRegex = /\.global\.less/
const imageRegex = /\.(bmp|gif|jpe?g|png)$/
const fontRegex = /\.(ttf|woff|woff2|eot|otf)$/

module.exports = {
  context: PROJECT_PATH,
  entry: {
    app: './src/index.tsx',
  },
  output: {
    path: resolveApp('./dist'),
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: './tsconfig.json',
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new CopyPlugin({
      patterns: [
        {
          context: './public',
          from: '**/*',
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
      {
        test: cssRegex,
        use: getStyleLoaders({
          importLoaders: 1,
          modules: {
            localIdentName: getCSSModuleLocalIdent(),
          },
        }),
        exclude: /node_modules/,
      },
      {
        test: cssRegex,
        use: getStyleLoaders({
          importLoaders: 1,
        }),
        include: /node_modules/,
      },
      {
        test: lessRegex,
        use: getStyleLoaders(
          {
            importLoaders: 2,
            modules: {
              localIdentName: getCSSModuleLocalIdent(),
            },
          },
          'less-loader',
        ),
        exclude: lessGlobalRegex,
      },
      {
        test: lessGlobalRegex,
        use: getStyleLoaders(
          {
            importLoaders: 2,
          },
          'less-loader',
        ),
      },
      getAssetRule(imageRegex, {
        limit: 5 * 1024,
        outputPath: 'assets/images',
      }),
      getAssetRule(fontRegex, {
        outputPath: 'assets/fonts',
      }),
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      '@': resolveApp('./src'),
      common: resolveApp('./src/common'),
      components: resolveApp('./src/components'),
      layouts: resolveApp('./src/layouts'),
      pages: resolveApp('./src/pages'),
      utils: resolveApp('./src/utils'),
    },
  },
}
