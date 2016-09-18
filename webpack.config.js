 module.exports = {
  entry: './src/client/js/main.js',
  output: {
    path: './static/js',
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }
    ]
  }
}
