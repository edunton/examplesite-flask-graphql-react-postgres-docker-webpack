const webpack = require('webpack');
const path = require('path');
const chalk = require('chalk');

const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
    let isDev = env.target === 'development'
    let mode = isDev ? 'development' : 'production';
    let devtool = isDev ? 'inline-source-map' : undefined;
    let transpileOnly = !isDev;

    let gqlEndpoint = !isDev && process.env.GQL_ENDPOINT ? process.env.GQL_ENDPOINT : '' 
  
    const versionNumber = `${require("./package.json").version}.${new Date().toISOString().replace(/[^\d]/g,'')}`
  
    console.log(chalk`\n\nCompiling for {greenBright.bold ${mode.toUpperCase()}} at {bold v.${versionNumber}}\n\n`);
    gqlEndpoint && console.log(chalk`\n\nGQL Endpoint at {greenBright.bold ${gqlEndpoint}}\n\n`);
    return {
  
      entry: path.resolve(__dirname,'src','index.tsx'),
      watch: isDev,
      watchOptions: {
        ignored: ["**/build/**/*"],
        poll: 1000
      },
      output: {
          path: path.resolve(__dirname, '..', 'server', 'build'),
          filename: 'project.bundle.[contenthash].js'
      },
  
      devtool,
      mode,
  
      optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 0,
          // name:true,
          cacheGroups: {
              vendor: {
                chunks: 'all',
                // name: 'vendor',
                test: /[\\/]node_modules[\\/]/,
                enforce: false,
                name(module) {
                  // get the name. E.g. node_modules/packageName/not/this/part.js
                  // or node_modules/packageName
                  const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
      
                  // npm package names are URL-safe, but some servers don't like @ symbols
                  return `npm.${packageName.replace('@', '')}`;
                },
              },
          }
        },
      },
  
      module: {
          rules: [
            {
              test: /\.tsx?$/,
              use: {
                loader:'ts-loader',
                options: {
                  transpileOnly,
                },
              },
              exclude: /node_modules/,
            },
            {
              test: /\.css$/i,
              use: ['style-loader', 'css-loader'],
            },
          ]
      },
  
      resolve: {
          extensions: [ '.tsx', '.ts', '.js' ]
      },
  
      plugins: [
          new webpack.DefinePlugin({
              '__GQL_ENDPOINT__' : JSON.stringify(gqlEndpoint),
          }),
  
          new HtmlWebpackPlugin({
            template:path.resolve(__dirname, 'public', 'index.html'),
            filename:'index.html',
          }),
      ],
    }
  };