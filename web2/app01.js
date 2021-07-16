var http = require('http');
const routes = require('./common/routes.js');
const url = require('url');


http.createServer(function (req, res) {

    // 创建静态WEB服务器
    routes.static(req, res, 'static');
    // 请求类型
    let method = req.method.toLowerCase();

    // 路由
    let pathName = url.parse(req.url).pathname.replace('/', '');
    try {
        routes[pathName](req, res);
    } catch (e) {
        routes['error'](req, res);
    }
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');