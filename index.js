const http = require("http")
const fs = require('fs')
/**
 * 瞎JB写，练习一下
 */
//创建服务实例
const server = new http.Server()
//监听请求
server.on("request", (req, res) => {
    //如果是post请求
    if (req.method === 'POST') {
        //请求的地址
        if (req.url == '/saveFile') {
            let postData = '';
            //监听参数
            req.on('data', chunk => {
                postData += chunk.toString()
            })
            //请求结束
            req.on('end', () => {
                const reqParams = JSON.parse(postData)
                let count = 1, lastFileData;
                //看有没有code文件夹，如果没就创建一个
                try {
                    fs.accessSync('./' + reqParams.isTable + '', fs.constants.R_OK | fs.constants.W_OK);//fs.constants.R_OK 读权限 fs.constants.W_OK写权限
                    //获取code文件夹文件列表，做内容对比使用
                    const fileList = fs.readdirSync('./' + reqParams.isTable);
                    let fileInfoList = []
                    for (let i = 0; i < fileList.length; i++) {
                        const f = fileList[i];
                        if (f.includes(reqParams.type)) {
                            ++count;//动态计算文件个数生成动态文件名
                            fileInfoList.push({
                                ...fs.statSync('./' + reqParams.isTable + '/' + f),//文件信息
                                name: f //文件名
                            })
                        }
                    }
                    //获取最近文件的内容
                    if (fileInfoList.length > 0) {
                        //时间戳排序
                        fileInfoList.sort((a, b) => {
                            return +new Date(b.birthtime) - +new Date(a.birthtime)
                        })
                        lastFileData = fs.readFileSync("./" + reqParams.isTable + "/" + fileInfoList[0].name).toString()
                    }
                } catch (err) {
                    count = 1;
                    //创建code文件夹
                    fs.mkdirSync('./' + reqParams.isTable)
                }
                //设置返回头
                res.setHeader('Content-Type', 'application/json;charset=utf-8');
                res.writeHead(200);
                //对比文件内容是否一致
                if (lastFileData == reqParams.code) {
                    if(reqParams.code === ''){
                        res.end(JSON.stringify({ state: 400, message: "数据不能为空" }))
                    }else{
                        res.end(JSON.stringify({ state: 400, message: "数据重复" }))
                    }
                } else {
                    //写文件
                    fs.writeFileSync('./' + reqParams.isTable + '/' + reqParams.type + '_' + count + '.js', reqParams.code, e => {
                        console.log('-------', e)
                    })
                    res.end(JSON.stringify({ state: 200, message: "请求成功" }))
                }

            })
        }
    }
})
//监听8001端口
server.listen(8001)
