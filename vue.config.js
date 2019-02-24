const Dotenv = require('dotenv-webpack')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/nem-wallet/' : '/',
  outputDir: 'docs',
  configureWebpack: {
    plugins: [new Dotenv()]
  }
}