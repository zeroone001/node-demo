var http = require('http');
const routes = require('./common/routes.js');
const url = require('url');
const ejs = require('ejs');


http.createServer(function (req, res) {

    // 创建静态WEB服务器
    routes.static(req, res, 'static');

    // 路由
    let pathName = url.parse(req.url).pathname;
    if (pathName === '/login') {
        /*
            ejs.renderFile(filename, data, options, function(err, str){
                // str => Rendered HTML string
            });
        */
        let msg = 'qweqww';
        ejs.renderFile('./template/login.ejs', { msg }, (err, data) => {
            if (err) {
                console.log(err);
            }
            res.writeHead(200, { 'Content-Type': `text/html;charset="utf-8"` });
            res.end(data);
        });
    } else if (pathName === '/news') {
        // 获取get传值
        const query = url.parse(req.url, true).query;
        console.log('query', query);
        res.writeHead(200, { 'Content-Type': `text/html;charset="utf-8"` });
        res.end('获取到get传值');
    } else if (pathName === '/doLogin') {
        let postData = '';
        req.on('data', (d) => {
            postData += d;
        });
        req.on('end', (d) => {
            console.log('postData', postData);
            res.end(postData);
        });
    }


}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');