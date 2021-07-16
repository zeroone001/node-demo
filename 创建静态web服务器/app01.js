var http = require('http');
const fs = require('fs');
const utils = require('./common/handleType');
const path = require('path');
const url = require('url');


http.createServer(function (req, res) {
    let pathName = url.parse(req.url).pathname; // 过滤get数据
    console.log('path', pathName);
    pathName = pathName === '/' ? '/aaa.html' : pathName;
    
    if (pathName !== '/favicon.ico') {
        fs.readFile('./static' + pathName, (err, data) => {
            if (err) {
                res.writeHead(200, {'Content-Type': 'text/html;charset="utf-8"'});
                res.end('文件不存在');
            }
            // let ty = utils.handleType(path.extname(pathName));
            // const ttt = await utils.getType(path.extname(pathName));
            const ttt = utils.getType2(path.extname(pathName));
            res.writeHead(200, {'Content-Type': `${ttt};charset="utf-8"`});
            res.end(data);
        });
    }


    
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');