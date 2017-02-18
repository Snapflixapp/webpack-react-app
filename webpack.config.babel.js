const { resolve } = require('path')
const webpack = require('webpack')

// https://github.com/jantimon/html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin')

// https://www.npmjs.com/package/webpack-config-utils
const {getIfUtils, removeEmpty} = require('webpack-config-utils')

module.exports = (env) => {
  const {ifProd} = getIfUtils(env)
  const config = {
    entry: [
      // activate HMR for React
      'react-hot-loader/patch',

      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint
      'webpack-dev-server/client?http://localhost:8080',

      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates
      'webpack/hot/only-dev-server',

      // the entry point of our app
      resolve(__dirname, 'src', 'index.jsx')
    ],
    output: {
      // the output bundle
      filename: 'bundle.js',

      path: resolve(__dirname, 'dist'),

      // necessary for HMR to know where to load the hot update chunks
      publicPath: '/'
    },

    context: resolve(__dirname, 'src'),

    devtool: ifProd('source-map', 'eval'),

    devServer: {
      // enable HMR on the server
      hot: true,

      // match the output path
      contentBase: resolve(__dirname, 'dist'),

      // match the output `publicPath`
      publicPath: '/',

      historyApiFallback: {
        index: 'index.html'
      }
    },

    module: {
      rules: [
        {
          test: /\.jsx$/,
          loaders: [
            'babel-loader'
          ],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          include: resolve(__dirname, 'src'),
          loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&camelCase!postcss-loader'
        }
      ]
    },
    plugins: removeEmpty([
      // enable HMR globally
      new webpack.HotModuleReplacementPlugin(),

      // prints more readable module names in the browser console on HMR updates
      new webpack.NamedModulesPlugin(),

      new HtmlWebpackPlugin({
        template: resolve(__dirname, 'src', 'index.tpl.html'),
        inject: 'body'
      })
    ]),
    resolve: {
      extensions: ['.js', '.jsx']
    }
  }

  return config
}
