const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

const Lang = require('./src/i18n/en.json');

module.exports = (env = {}) => {
  let defaults = {
      mode: 'development',
      test: false,
      server: false,
      watch: false,
      outputPath: './dist'
    },
    {mode, test, server, watch, outputPath} = {...defaults, ...env},
    outputAbsPath = path.resolve(__dirname, outputPath || 'dist');
  
  return {
    entry: ['@babel/polyfill', './src/index.js'],
    mode: mode,
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
        images: path.resolve(__dirname, 'src/images'),
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
                  mode === 'production' ? ["@babel/preset-env", {"useBuiltIns": "entry"}] : '',
                  mode === 'production' ? "minify" : '',
                  "@babel/preset-react",
                ].filter(v => v),
                "plugins": [
                  "@babel/plugin-proposal-class-properties",
                  "@babel/plugin-proposal-export-default-from"
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
                name: 'img/[path][name].[ext]',
                context: 'src'
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
        template: './src/index.ejs',
        title: Lang.mainTitle,
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      server ? new WebpackShellPlugin({
        onBuildEnd:[`nodemon ${[watch ? `--watch ${outputAbsPath}` : '', mode === 'development' ? '--inspect-brk=0.0.0.0' : ''].filter(v => v).join(' ')} . --use-dir=${outputAbsPath}`]
      }) : null
    ].filter(v => v)
  }
};