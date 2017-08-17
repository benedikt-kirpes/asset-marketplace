const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './app/javascripts/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js'
  },
  plugins: [
    // Copy our app's index.html to the build folder.
    // all new added files in the "app" folder have to be added here
    new CopyWebpackPlugin([
        { from: './app/css', to: './css' },
        { from: './app/stylesheets', to: './stylesheets' },
        //{ from: './app/css/sidenav.css', to: './css' },
        { from: './app/fonts', to: './fonts' },
        { from: './app/img', to: "./img" },
        { from: './app/vendor', to: "./vendor" },
        { from: './app/js', to: "./js" },
        { from: './app/index.html', to: "." },
        { from: './app/buyer.html', to: "." },
        { from: './app/seller.html', to: "." },
        { from: './app/log.html', to: "." }
    ])
  ],
  module: {
    rules: [
      {
       test: /\.css$/,
       use: [ 'style-loader', 'css-loader' ]
      }
    ],
    loaders: [
      { test: /\.json$/, use: 'json-loader' },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      }
    ]
  }
}
