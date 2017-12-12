const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack')
const jquery = require('jquery')

module.exports = {
  entry: {
    vendor:['jquery','./src/js/common.js'],
    index: './src/js/index.js',
    inner: './src/js/inner.js'
  },
  output: {
    path: path.resolve(__dirname,'./dist'),
    filename: 'js/[name].js',
    publicPath: ''
  },
  module: {
    rules:[
      {
        test:/\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test:/\.js$/,
        include:path.resolve(__dirname,'src'),
        exclude:/(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename:'index.html',
      template: './src/index.html',
      chunks: ['index','vendor'],
      minify: {
        removeComments:true,
        collapseWhitespace:true
      }
    }),
    new HtmlWebpackPlugin({
      filename:'inner.html',
      template:'./src/inner.html',
      chunks: ['inner','vendor']
    }),
    new CleanWebpackPlugin('dist',{
      root: __dirname,
      exclude:[],
      verbose:true,
      dry: false
    }),
    new ExtractTextPlugin("style.css"),
    new webpack.optimize.CommonsChunkPlugin({
      name:'vendor',
      chunks:['index','inner','vendor'],
      mikChunks:3
    }),
    new webpack.ProvidePlugin({
      $:'jquery',
      jQuery:'jquery',
      'window.jQuery':'jquery'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
      }
    })
  ]
  //devtool: '#source-map'
}