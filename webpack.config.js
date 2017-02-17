require('dotenv').config()
const webpack = require('webpack')
const S3Plugin = require('webpack-s3-plugin')
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
      }),
      ifProd(new S3Plugin({
        s3Options: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: 'us-west-1'
        },
        s3UploadOptions: {
          Bucket: 'snapflixapp.com'
        }
      }))
    ]),
    resolve: {
      extensions: ['.js', '.jsx']
    }
  }

  return config
}
