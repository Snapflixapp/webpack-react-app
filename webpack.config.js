require('dotenv').config()
var webpack = require('webpack');
var S3Plugin = require('webpack-s3-plugin');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var BUILD_DIR = path.join(__dirname, '/dist/');
var APP_DIR = path.join(__dirname, '/app/src/');

var config = {
  entry: APP_DIR + 'index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    })
    // ,
    // new S3Plugin({
    //   s3Options: {
    //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    //     region: 'us-west-1'
    //   },
    //   s3UploadOptions: {
    //     Bucket: 'snapflixapp.com'
    //   }
    // })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader'
      }
    ]
  }
};

module.exports = config;

