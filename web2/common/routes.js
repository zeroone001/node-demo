const fs = require('fs');
const path = require('path');
const url = require('url');
const ejs = require('ejs');
const querystring = require('querystring');
const { MongoClient } = require('mongodb');
// 定义数据库链接的地址
const urlDB = 'mongodb://zhangsan:123456@localhost:27017/?authSource=nowDB&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
// 定义要操作的数据库
const DBName = 'nowDB';

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
        // 数据库链接
        MongoClient.connect(urlDB, (e, client) => {
            if (e) {
                console.log(e);
                return;
            }
            let db = client.db(DBName);
            // 查找数据
            db.collection('order').find().toArray((error, lists) => {
                if (error) {
                    console.log('2', error);
                    return;
                }
                // 关闭数据库
                client.close();
                ejs.renderFile('./template/login.ejs', {
                    msg,
                    lists
                 }, (err, data) => {
                    if (err) {
                        console.log(err);
                    }
                    res.writeHead(200, { 'Content-Type': `text/html;charset="utf-8"` });
                    res.end(data);
                });
            });
        });
        // client.connect((e) => {
            
        // })
    },
    news: (req, res) => {
        // 获取get传值
        // const query = url.parse(req.url, true).query;
        // console.log('query', query);
        MongoClient.connect(urlDB, (e, client) => {
            if (e) {
                console.log(e);
                return;
            }
            let db = client.db(DBName);
            // 查找数据
            db.collection('order').find().toArray((error, lists) => {
                if (error) {
                    console.log('2', error);
                    return;
                }
                // 关闭数据库
                client.close();
                // res.writeHead(200, { 'Content-Type': `text/html;charset="utf-8"` });
                res.writeHead(200, { 'Content-Type': `application/json;charset="utf-8"` });
                // end 必须是string或者Buffer
                res.end(JSON.stringify({
                    error_code: 0,
                    data: lists
                }));
                // ejs.renderFile('./template/login.ejs', {
                //     msg,
                //     lists
                //  }, (err, data) => {
                //     if (err) {
                //         console.log(err);
                //     }
                //     res.writeHead(200, { 'Content-Type': `text/html;charset="utf-8"` });
                //     res.end(data);
                // });
            });
        });
        
    },
    doLogin: (req, res) => {
        // 获取登录传过来的数据
        let postData = '';
        req.on('data', (d) => {
            postData += d;
        });
        req.on('end', (d) => {
            const pd = querystring.parse(postData);
            console.log('postData', querystring.parse(postData));
            MongoClient.connect(urlDB, (e, client) => {
                if(e) {
                    console.log(e);
                    return;
                }
                let db = client.db(DBName);
                const dbData = {
                    order_id: 4,
                    uid: 4,
                    trade_no: pd.username,
                    all_price: pd.password,
                    all_num: 20
                };
                db.collection('order').insertOne(dbData, (err, data) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    client.close();
                    res.writeHead(200, { 'Content-Type': `text/html;charset="utf-8"` });
                    res.end(postData);
                });
                
            });
            
        });
    },
    error: (req, res) => {
        res.end('404');
    }
};

module.exports = app;
