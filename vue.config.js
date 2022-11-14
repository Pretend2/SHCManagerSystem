const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  lintOnSave: false, // 关闭语法检测
  // 配置 jade
  chainWebpack: config => {
    config.module.rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()
  },
  devServer: { // 开发服务器
    proxy: { // 代理
      '/api': {
        target: 'http://localhost:8080',
        // ws: true
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
})
