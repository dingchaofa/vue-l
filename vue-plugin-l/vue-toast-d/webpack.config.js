const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test:/\.vue$/,
        loader:'vue-loader',
        exclude:/node_module/,
        options: {
          loaders:{
            scss:'style-loader!css-loader!sass-loader'
          }
        }
      },
      {
        test:/\.js$/,
        loader:'babel-loader',
        exclude:/node_module/,
        include:path.resolve(__dirname,'src')
      }
    ]
  },
  plugins: []
};