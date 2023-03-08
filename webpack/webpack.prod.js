const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');

const common = require('./webpack.common');

dotenv.config();

module.exports = {
  ...common,
  performance: {
    hints: 'warning',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
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
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/main.css',
      chunkFilename: 'css/[name].[hash].css',
    }),
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
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../src/index.html'),
      inject: true,
      hash: true,
      minify: {
        removeAttributeQuotes: false,
        collapseWhitespace: false,
        html5: true,
        removeComments: true,
        removeEmptyAttributes: true,
        minifyCSS: true,
      },
    }),
    new FaviconsWebpackPlugin({
      logo: path.join(__dirname, '../src/assets/images/logo.svg'),
      inject: true,
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets/images/logo.svg', to: './' }
      ]
    })
  ],
  optimization: {
    runtimeChunk: true,
    splitChunks: { chunks: 'all' },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
        },
      }),
    ],
  },
};
