const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackHtmlPlugin = require('html-webpack-plugin');
//const ModuleFederationPlugin = require('webpack/lib/ModuleFederationPlugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: 'development',
  devServer: {
    port: 8081
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'microFrontEnd1',
      filename: 'remoteEntry.js',
      exposes: {
        './MicroFrontEnd1Index': './src/index'
      }
    }),    
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};