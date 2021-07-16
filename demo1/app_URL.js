const http = require('http');
// const URL = require('url');
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';

const host = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
    // console.log('req', req.url);
    // 下面这个已经不建议使用了
    // const theUrl = url.parse(req.url, true);
    // console.log(theUrl.query);
    if (req.url !== '/favicon.ico') {
        // console.log('req', req);
    }
    
    const theURL = new URL(`http://${host}${req.url}`);
    // console.log('search', theURL.search);
    console.log('searchParams-->', theURL.searchParams.get('name'));


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