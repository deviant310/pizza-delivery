const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const exec = require('child_process').exec;

module.exports = ({mode, test, server, 'output-path': outputPath}) => {
  let outputAbsPath = path.resolve(__dirname, outputPath || 'dist');
  
  return {
    mode: mode || 'development',
    output: {
      path: outputAbsPath,
      publicPath: '/'
    },
    resolve: {
      alias: {
        actions: path.resolve(__dirname, 'src/actions'),
        api: path.resolve(__dirname, 'src', test ? 'api-test' : 'api'),
        components: path.resolve(__dirname, 'src/components'),
        config: path.resolve(__dirname, 'src/config.json'),
        data: path.resolve(__dirname, 'src/data'),
        pages: path.resolve(__dirname, 'src/pages'),
        reducers: path.resolve(__dirname, 'src/reducers'),
        img: path.resolve(__dirname, 'src/img'),
        i18n: path.resolve(__dirname, 'src/i18n'),
      }
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  mode === 'production' ? '@babel/preset-env' : '', 
                  '@babel/preset-react'
                ].filter(v => v),
                "plugins": [
                  "@babel/plugin-proposal-class-properties"
                ]
              }
            }
          ],
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader, 'css-loader'
          ],
        },
        {
          test: /\.json$/,
          include: [
            path.resolve(__dirname, "src/data")
          ],
          use: [
            {
              loader: 'file-loader', 
              options: {
                name: 'data/[name].[ext]',
              }
            },
          ],
          type: 'javascript/auto'
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'fonts/[name].[ext]',
              },
            },
          ],
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.ejs'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      server ? new WebpackShellPlugin({
        onBuildEnd:[`nodemon --watch ${outputAbsPath} ${mode === 'development' ? '--inspect' : ''} index.js --use-dir=${outputAbsPath}`]
      }) : null
    ].filter(v => v)
  }
};