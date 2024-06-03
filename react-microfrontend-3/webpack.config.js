const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackHtmlPlugin = require('html-webpack-plugin');
//const ModuleFederationPlugin = require('webpack/lib/ModuleFederationPlugin');
const { ModuleFederationPlugin } = require('webpack').container;
const webpack = require('webpack');
const EncodingPlugin = require('webpack-encoding-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    port: 8083
  },
  module: {
    rules: [
        {
            /* The following line to ask babel 
             to compile any file with extension
             .js */
            test: /\.js?$/,

            /* exclude node_modules directory from babel. 
            Babel will not compile any files in this directory*/
            exclude: /node_modules/,

            // To Use babel Loader
            loader: 'babel-loader',
            options: {

                presets: ['@babel/preset-env' /* to transfer any advansed ES to ES5 */, 
                          '@babel/preset-react'], // to compile react to ES5
            },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: ['@svgr/webpack'],
        },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'reactFrontEnd3',
      filename: 'remoteEntry.js',
      exposes: {
        './ReactFrontEnd3Index': './src/index'
      }
    }),    
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.ProvidePlugin({
      "React": "react",
    }),
    new EncodingPlugin({
      encoding: 'UTF-8'
    }),
  ]
};