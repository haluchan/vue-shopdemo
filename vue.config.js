module.exports = {
  // 配置高於chainWebpack中關於 css loader 的配置
  assetsDir: 'assets/',
  publicPath: '/', // Base directory for dev
  css: {
    // 是否建立css map，false 可以提高complier速度
    sourceMap: false,
    loaderOptions: {
      scss: {
        // scss自定義變數全域引入
        data: `@import "@/assets/scss/main.scss";`
      }
    }
  },
  // 引入字體
  chainWebpack: config => {
    config.module
      .rule('fonts')
      .test(/\.(ttf|otf|eot|woff|woff2)$/)
      .use('file-loader')
      .loader('file-loader')
      .tap(options => {
        options = {
          // limit: 10000,
          name: '/assets/fonts/[name].[ext]'
        }
        return options
      })
      .end()
  }
}
