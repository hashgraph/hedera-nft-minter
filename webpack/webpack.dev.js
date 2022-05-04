const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const dotenv = require('dotenv');

const common = require('./webpack.common');

dotenv.config();

module.exports = {
  ...common,
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    https: true,
    historyApiFallback: true,
    open: true,
    host: 'localhost',
    port: 8080,
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },

  module: {
    rules: [
      {
        test: /\.m?(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [require.resolve('react-refresh/babel')],
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['autoprefixer']],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /pl/),
    new FaviconsWebpackPlugin({
      logo: path.join(__dirname, '../src/assets/images/logo.svg'),
      inject: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../src/index.html'),
    }),
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      IPFS_KEY: JSON.stringify(process.env.IPFS_KEY),
      IPFS_URL: JSON.stringify(process.env.IPFS_URL),
    }),

  ],
};
