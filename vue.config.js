const { defineConfig } = require('@vue/cli-service')

const publicPath = process.env.NODE_ENV === 'production' ? '/Frontend/' : '/'

module.exports = {
  publicPath: publicPath,
  ...defineConfig({
    transpileDependencies: true
  })
};
