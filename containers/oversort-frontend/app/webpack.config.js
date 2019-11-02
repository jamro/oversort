const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  const config = {
    entry: './src/index.js',
    devtool: '',
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
      moduleIds: 'hashed',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    resolve: {
      alias: {
        jquery: "jquery/src/jquery"
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        VERSION: JSON.stringify((new Date()).toISOString().replace('Z', '').replace('T', ' '))
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'OverSort',
        template: path.join(__dirname, '/src/index.html')
      })
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    }
  };
  if(argv.mode === 'development') {
    config.devtool = 'inline-source-map';
    config.watch = true;
    config.devServer = {
      contentBase: './dist'
    }
  }
  return config;
};
