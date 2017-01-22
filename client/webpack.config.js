const path = require('path');
const webpack = require("webpack");
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const loader = require('awesome-typescript-loader');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'sourcemap',
  performance: false,
  resolve: {
    extensions: ['.ts', '.js']
  },
  entry: {
    main: './src/main.ts',
    vendor: './src/vendor.ts',
    polyfills: './src/polyfills.ts'
  },
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: "[name].js"
  },
  plugins: [
    new CommonsChunkPlugin({
      name: ['vendor', 'polyfills']
    }),
    new loader.CheckerPlugin(),
    new HtmlwebpackPlugin({
      title: 'Backend',
      baseUrl: '/',
      template: './src/static/index.html'
    }),
    new CopyWebpackPlugin([{
      from: './src/static',
      to: './',
      ignore: ['index.html']
    }])
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'angular2-template-loader',
          'awesome-typescript-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'to-string-loader',
          'css-loader'
        ]
      },
      {
        test: /\.html/,
        loader: 'html-loader'
      }
    ]
  }
};
