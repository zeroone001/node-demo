const fs = require('fs');
const path = require('path');
const url = require('url');
const ejs = require('ejs');

// 同步读取数据
let getType2 = function (extName) {
    const data = fs.readFileSync('./data/mime.json');
    const jObject = JSON.parse(data.toString());
    console.log('jObject[extName]', jObject[extName]);
    return jObject[extName];
};

const app = {
    static: (req, res, staticPath) => {
        let pathName = url.parse(req.url).pathname; // 过滤get数据
        console.log('path', pathName);
        pathName = pathName === '/' ? '/aaa.html' : pathName;

        if (pathName !== '/favicon.ico') {
            try {
                // 改为同步
                let data = fs.readFileSync('./' + staticPath + pathName);
                // let ty = utils.handleType(path.extname(pathName));
                // const ttt = await utils.getType(path.extname(pathName));
                const ttt = getType2(path.extname(pathName));
                res.writeHead(200, { 'Content-Type': `${ttt};charset="utf-8"` });
                res.end(data);
            } catch (error) {

            }
        }
    },
    login: (req, res) => {
        let msg = 'qweqww';
        ejs.renderFile('./template/login.ejs', { msg }, (err, data) => {
            if (err) {
                console.log(err);
            }
            res.writeHead(200, { 'Content-Type': `text/html;charset="utf-8"` });
            res.end(data);
        });
    },
    news: (req, res) => {
        // 获取get传值
        const query = url.parse(req.url, true).query;
        console.log('query', query);
        res.writeHead(200, { 'Content-Type': `text/html;charset="utf-8"` });
        res.end('获取到get传值');
    },
    doLogin: (req, res) => {
        let postData = '';
        req.on('data', (d) => {
            postData += d;
        });
        req.on('end', (d) => {
            console.log('postData', postData);
            res.end(postData);
        });
    },
    error: (req, res) => {
        res.end('404');
    }
};

module.exports = app;
