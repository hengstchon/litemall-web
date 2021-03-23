const path = require('path')

module.exports = {
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    port: 6080,
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve('src'),
      },
    },
    optimization: {
      runtimeChunk: {
        name: entrypoint => `runtime~${entrypoint.name}`,
      },
    },
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 直接覆盖变量
          'sidebar-selected-text-color': '#ee0a24',
        },
      },
    },
  },
}
