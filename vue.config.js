const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    outputDir: "docs",
    publicPath: "./",
    chainWebpack: config => {
        config.resolve.alias.set(
            '@assets', resolve('src/assets')
        ),
        config.plugin('html').tap(arg => {
            arg[0].title = "测试"
            return arg
        })
    },
    
}