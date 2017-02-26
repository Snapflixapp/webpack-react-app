/* eslint-disable no-unused-vars */

// https://www.npmjs.com/package/dotenv
require('dotenv').config()

const webpack = require('webpack')
const { resolve } = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const { getIfUtils, removeEmpty } = require('webpack-config-utils')

const APP_DIR = resolve(__dirname, 'src')
const BUILD_DIR = resolve(__dirname, 'dist')

module.exports = (env) => {
  // https://www.npmjs.com/package/webpack-config-utils
  const { ifProd, ifNotProd } = getIfUtils(env)

  const config = {
    entry: removeEmpty([
      // activate HMR for React
      ifNotProd('react-hot-loader/patch'),

      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint
      ifNotProd('webpack-dev-server/client?http://localhost:8080'),

      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates
      ifNotProd('webpack/hot/only-dev-server'),

      // the entry point of our app
      resolve(APP_DIR, 'index.jsx')
    ]),
    output: {
      // the output bundle
      filename: 'bundle.js',

      path: BUILD_DIR,

      // necessary for HMR to know where to load the hot update chunks
      publicPath: '/'
    },

    context: APP_DIR,

    devtool: ifProd('source-map', 'eval'),

    devServer: {
      // enable HMR on the server
      hot: true,

      // match the output path
      contentBase: BUILD_DIR,

      // match the output `publicPath`
      publicPath: '/',

      historyApiFallback: {
        index: 'index.html'
      },

      stats: {
        chunkModules: false
      }
    },

    module: {
      rules: removeEmpty([
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loaders: [
            'babel-loader'
          ]
        },
        ifNotProd({
          test: /\.css$/,
          include: resolve(__dirname, 'src'),
          loaders: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
                importLoaders: 1,
                camelCase: true
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        }),
        ifProd({
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
          })
        })
      ])
    },
    plugins: removeEmpty([

      // https://www.npmjs.com/package/progress-bar-webpack-plugin
      new ProgressBarPlugin(),

      // enable HMR globally
      ifNotProd(new webpack.HotModuleReplacementPlugin()),

      // prints more readable module names in the browser console on HMR updates
      ifNotProd(new webpack.NamedModulesPlugin()),

      // https://github.com/webpack-contrib/extract-text-webpack-plugin
      ifProd(new ExtractTextPlugin({
        filename: './css/[name]-[hash].css',
        allChunks: true
      })),

      // https://github.com/jantimon/html-webpack-plugin
      new HtmlWebpackPlugin({
        template: resolve(APP_DIR, 'index.tpl.html'),
        inject: 'body'
      }),

      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: ifProd('"production"', '"development"')
        }
      }),

      ifProd(new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false
        },
        sourceMap: true
      }))
    ]),
    resolve: {
      extensions: ['.js', '.jsx']
    }
  }

  return config
}
