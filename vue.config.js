const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    //
    productionSourceMap: false,
    transpileDependencies: true,
    // 关闭eslint校验代码
    lintOnSave: false,
    // 代理服务器解决跨域
    devServer: {
        proxy: {
            '/api': {
                target: 'http://gmall-h5-api.atguigu.cn',
                // pathRewrite: { '^/api': '' }
            }
        }
    }

})