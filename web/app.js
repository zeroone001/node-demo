var http = require('http');
const fs = require('fs');
http.createServer(function (req, res) {

    let pathName = req.url;

    pathName = pathName === '/' ? '/aaa.html' : pathName;

    console.log('path', pathName);
    if (pathName !== '/favicon.ico') {
        fs.readFile('./static' + pathName, (err, data) => {
            if (err) {
                res.writeHead(200, {'Content-Type': 'text/html;charset="utf-8"'});
                res.end('文件不存在');
            }
            res.writeHead(200, {'Content-Type': 'text/html;charset="utf-8"'});
            res.end(data);
        });
    }


    
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');