var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './server.js',
  output: {
    path: path.resolve(__dirname, './'),
    publicPath: '/',
    filename: 'app.js'
  },
  module: {
    rules: [      
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
      
    ]
  },
}