const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
  filename: 'main.css',
});

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractPlugin.extract({
          fallback: ['style-loader'],
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
              // publicPath: '/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    extractPlugin,
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CleanWebpackPlugin(['dist']),
  ],
};
