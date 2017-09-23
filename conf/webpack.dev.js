const path = require('path');

const config = require('./webpack.config.js');

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port))
    // named pipe
    return val;

  if (port >= 0)
    return port;

  return false;
}

const extension = {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '..', 'build'),
    proxy: {
      '/api': 'http://localhost:' + normalizePort(process.env.PORT || '3000')
    },
    historyApiFallback: true
  }
};

module.exports = Object.assign({}, extension, config);
