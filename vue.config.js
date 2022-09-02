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
        )
    }
}