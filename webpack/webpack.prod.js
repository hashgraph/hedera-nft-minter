const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
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
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/main.css',
      chunkFilename: 'css/[name].[hash].css',
    }),
    new webpack.DefinePlugin({
      BASE_URL: JSON.stringify(process.env.BASE_URL),
      AUTH_BASIC: JSON.stringify(process.env.AUTH_BASIC),
      S3_URL: JSON.stringify(process.env.S3_URL),
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
