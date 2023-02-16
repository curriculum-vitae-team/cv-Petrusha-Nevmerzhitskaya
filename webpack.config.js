const { resolve } = require('path');
require('dotenv').config();
const { EnvironmentPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.tsx'
  },
  plugins: [
    new EnvironmentPlugin([]),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new ForkTsCheckerWebpackPlugin(),
    new ESLintPlugin({
      emitError: true,
      emitWarning: true,
      failOnError: true,
      extensions: ['.ts', '.tsx', '.js']
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        include: [resolve(__dirname, 'src')],
        exclude: /node_modules/,
        options: {
          loader: 'tsx',
          target: 'es2015'
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: resolve(__dirname, 'src/assets'),
        type: 'asset/resource'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    symlinks: false,
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@components': resolve(__dirname, 'src/components/'),
      '@constants': resolve(__dirname, 'src/constants/'),
      '@graphql': resolve(__dirname, 'src/graphql/'),
      '@hooks': resolve(__dirname, 'src/hooks/'),
      '@interfaces': resolve(__dirname, 'src/interfaces/'),
      '@pages': resolve(__dirname, 'src/pages/'),
      '@route': resolve(__dirname, 'src/route/'),
      '@themes': resolve(__dirname, 'src/themes/'),
      '@utils': resolve(__dirname, 'src/utils/')
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'async'
    }
  }
};
