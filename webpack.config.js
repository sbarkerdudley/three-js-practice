const path = require('path');

const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');
const SRC_FILE = path.resolve(SRC_DIR, 'index.js');

module.exports = {
  entry: ['babel-polyfill', SRC_FILE],
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  devServer: {
    static: {
      directory: DIST_DIR
    },
    compress: true,
    port: 9000,
    hot: true
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.?(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              '@babel/preset-env',
            ]
          }
        }
      },
      {
        test: /\.?css$/i,
        use: [ 'style-loader', 'css-loader' ],
      },
      {
        test: /\.?(js|jsx)$/i,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.?(ttf|woff|otf|woff|woff2|eot)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.?(gif|jpg|png|svg|bmp|tiff|jpeg)$/i,
        type: 'asset/resource',
      },
    ]
  },
  resolve: {
    extensions: ['.css', '.js', '.ts', '.tsx', '.jsx', '...']
  }
};

