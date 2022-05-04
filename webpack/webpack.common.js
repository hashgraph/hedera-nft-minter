const path = require('path');
const SRC_PATH = path.resolve(__dirname, '../src');

module.exports = {
  resolve: {
    alias: {
      // Base
      '@': SRC_PATH,
      '@src': SRC_PATH,
      // Assets
      '@assets': `${SRC_PATH}/assets`,
      '@images': `${SRC_PATH}/assets/images`,
      // Router
      '@routes': `${SRC_PATH}/routes`,
      '@pages': `${SRC_PATH}/pages`,
      // Utils
      '@utils': `${SRC_PATH}/utils`,
      '@const': `${SRC_PATH}/utils/const`,
      '@helpers': `${SRC_PATH}/utils/helpers`,
      '@hooks': `${SRC_PATH}/utils/hooks`,
      // Components
      '@components': `${SRC_PATH}/components`,
      '@hoc': `${SRC_PATH}/components/hoc`,
      '@layout': `${SRC_PATH}/components/shared/layout`,
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  context: path.join(__dirname, '../'),
  entry: ['babel-polyfill', './src/index.tsx'],
  output: {
    path: path.join(__dirname, '../build'),
    filename: './js/[name].js',
    publicPath: '/',
  },
};
