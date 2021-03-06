const webpack           = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BabiliPlugin      = require("babili-webpack-plugin")
const { join }          = require('path')

let base = {
  resolve: {
    extensions: [ '.jsx', '.js', '.json', '.templ' ]
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.templ/,
        loader: 'raw-loader'
      }
    ]
  },

  externals: {
    'node-pty': 'commonjs node-pty'
  },

  plugins: []
}

const app = {
  entry: join(__dirname, 'src', 'bootstrap'),
  target: 'electron-renderer',

  output: {
    path: join(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: join(__dirname, 'src', 'index.html'),
      inject: false,
      minify: {
        collapseWhitespace: true,
        removeComments: true
      },
      title: 'Yet Another Terminal',
    })
  ],
  devtool: 'source-map'
}

const main = {
  entry: join(__dirname, 'main', 'index'),
  target: 'electron-main',

  output: {
    path: join(__dirname, 'dist'),
    filename: 'main.js'
  }
}

if(process.env.NODE_ENV == 'production') {

  base.plugins.push(new BabiliPlugin())
  base.plugins.push(new webpack.optimize.ModuleConcatenationPlugin())

}

module.exports = [
  Object.assign({}, base, app),
  Object.assign({}, base, main)
]
