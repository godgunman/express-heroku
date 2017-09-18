const path = require('path');
const webpack = require("webpack");

module.exports = {
  entry: './client.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'static/build')
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js|jsx$/,
        loader: 'babel-loader'
      }
    ]
  },
};