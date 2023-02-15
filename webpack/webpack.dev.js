const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
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
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/i,
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
      APP_NAME: JSON.stringify(process.env.APP_NAME),
      HEDERA_NETWORK: JSON.stringify(process.env.HEDERA_NETWORK),
      HEDERA_MIRROR_NODE_API_VERSION: JSON.stringify(process.env.HEDERA_MIRROR_NODE_API_VERSION),
      IPFS_URL: JSON.stringify(process.env.IPFS_URL),
      IPFS_KEYS: process.env.IPFS_KEYS,
      API_HOST: JSON.stringify(process.env.API_HOST),
      HASHPACK_APP_CONFIG_NAME: JSON.stringify(process.env.HASHPACK_APP_CONFIG_NAME),
      HASHPACK_APP_CONFIG_DESCRIPTION: JSON.stringify(process.env.HASHPACK_APP_CONFIG_DESCRIPTION),
      HASHPACK_APP_CONFIG_ICON_URL: JSON.stringify(process.env.HASHPACK_APP_CONFIG_ICON_URL),
      IPFS_GATEWAYS: process.env?.IPFS_GATEWAYS,
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets/images/logo.svg', to: './' }
      ]
    })
  ],
};
