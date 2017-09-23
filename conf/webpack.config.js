const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, '..', 'src', 'index.js')
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '..', 'build')
  },
  module: {
    rules: [
      {
        // Lint first before Babel processes js
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                presets: ['env', 'react'],
                cacheDirectory: false
              }
            }
          },
          {
            test: /\.css$/,
            use: [
              {
                loader: 'style-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 1
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                  config: {
                    path: path.resolve(__dirname, 'postcss.config.js')
                  }
                }
              }
            ]
          },
          {
            // Exclude `js` files to keep "css" loader working as it injects
            // it's runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          }
        ]
      }
    ]
  },
  plugins: [
    // Generates index.html from template
    new HtmlWebpackPlugin({
      favicon: 'public/favicon.ico',
      template: 'public/index.html'
    })
  ]
};
