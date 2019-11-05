const path = require('path')

/** @type import('webpack').Configuration */
const config = {
  // mode: 'production',
  mode: 'development',
  entry: './src/sample.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
}

module.exports = config
