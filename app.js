const http = require('http');
const url = require('url');

const host = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
    res.statusCode = 200; // 状态码
    res.setHeader("content-type", "text/html;charset='utf-8'");
    // 解决乱码
    res.write("<head><meta charset='UTF-8'></head>");
    res.write('刘永胜');
    res.end();
});
server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});