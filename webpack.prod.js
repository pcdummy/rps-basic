var path = require('path');
var webpack = require('webpack');

// TODO: Remove React from bundle, treat it as a globally available variable
module.exports = {
  mode: 'production',
  entry: ['./src/index.jsx'],
  optimization: {
    minimize: false,
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.(jpg|png|svg|eot|woff|woff2|ttf|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[hash].[ext]',
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-import')({
                  addDependencyTo: webpack,
                  path: ['node_modules'],
                }),
                require('postcss-color-function'),
                require('postcss-url')(),
                require('autoprefixer')({ browsers: ['last 2 versions'] }),
                require('precss')(),
              ],
            },
          },
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
};
