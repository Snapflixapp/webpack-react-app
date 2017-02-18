/* eslint-disable no-unused-vars */

require('babel-register')
// require('dotenv').config() // https://www.npmjs.com/package/dotenv
const webpack = require('webpack')
const {join} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {getIfUtils, removeEmpty} = require('webpack-config-utils')  // https://www.npmjs.com/package/webpack-config-utils

const APP_DIR = join(__dirname, '/src/')
const BUILD_DIR = join(__dirname, '/dist/')

module.exports = (env) => {
  const {ifProd} = getIfUtils(env)
  const config = {
    entry: join(APP_DIR, 'index.jsx'),
    output: {
      path: BUILD_DIR,
      filename: 'bundle.js'
    },
    devtool: ifProd('source-map', 'eval'),
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['babel-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        }
      ]
    },
    plugins: removeEmpty([
      new HtmlWebpackPlugin({
        template: join(APP_DIR, 'index.tpl.html'),
        inject: 'body',
        filename: join(BUILD_DIR, 'index.html')
      })
    ]),
    resolve: {
      extensions: ['.js', '.jsx']
    }
  }

  return config
}
