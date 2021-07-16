const fs = require('fs');
const path = require('path');
const url = require('url');
exports.handleType = function (type) {
    switch (type) {
        case '.js':
            return 'text/javascript';
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        default:
            return 'text/html';
    }
};
exports.getType = function (extName) {
    // 封装Promise
    return new Promise((resolve) => {
        fs.readFile('./data/mime.json', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            const jObject = JSON.parse(data.toString());
            console.log('jObject[extName]', jObject[extName]);
            resolve(jObject[extName]);
        });
    });
};
// 同步读取数据
let getType2 = function (extName) {
    const data = fs.readFileSync('./data/mime.json');
    const jObject = JSON.parse(data.toString());
    console.log('jObject[extName]', jObject[extName]);
    return jObject[extName];
};

exports.static = function (req, res, staticPath) {
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
};
