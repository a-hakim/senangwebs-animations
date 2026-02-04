const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = [
  {
    entry: {
      swa: ['./src/css/swa.css', './src/js/swa.js']
    },
    output: {
      filename: 'swa.js',
      path: path.resolve(__dirname, 'dist'),
      library: {
        name: 'SWA',
        type: 'umd',
      },
      globalObject: 'this'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'swa.css'
      })
    ]
  },
  {
    entry: {
      swa: ['./src/css/swa.css', './src/js/swa.js']
    },
    output: {
      filename: 'swa.min.js',
      path: path.resolve(__dirname, 'dist'),
      library: {
        name: 'SWA',
        type: 'umd',
      },
      globalObject: 'this'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'swa.min.css'
      })
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin(),
        new CssMinimizerPlugin()
      ]
    }
  }
];