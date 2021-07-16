const fs = require('fs');
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
exports.getType2 = function (extName) {
    const data = fs.readFileSync('./data/mime.json'); 
    const jObject = JSON.parse(data.toString());
    console.log('jObject[extName]', jObject[extName]);
    return jObject[extName];
};
