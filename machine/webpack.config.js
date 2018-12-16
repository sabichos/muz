const path = require('path');

module.exports = {
  entry: ['./lib/stateMachine.js','./lib/withMachine','./lib/exporter.js'],
  output: {
    filename: 'stateMachine.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};