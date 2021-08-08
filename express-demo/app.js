const express = require('express');

const app = express();
// const ejs = require('ejs');

// 配置模板引擎
// app.engine("html", ejs.__express);
// app.set("view engine", "html");


// ejs

app.set("view engine", "ejs");


// 指定模板的位置
app.set('views', __dirname + '/view');

// 配置静态资源目录 -- 静态文件托管
app.use(express.static("static"));

// 中间件 (用于权限判断)
app.use((req,res, next)=> {
    console.log(new Date());
    next();
});


// 配置路由
app.get('/', (req, res) => {
    res.render('index', {
        title: 'ejs 模板',
        tag: '<h3>我是h3标签</h3>' // 使用<%- tag %> 这样输出
    });
    // res.send('111123');
});

app.get('/login', (req, res) => {
    res.send('login');
});

app.post('/dologin', (req, res) => {
    res.send('login');
});

// 动态路由 http://127.0.0.1:3000/article/123
app.get('/article/:id', (req, res) => {
    let id = req.params.id;
    res.send(`动态路由:${id}`);
});

// get 传值 http://127.0.0.1:3000/product?id=eqw
app.get('/product', (req, res) => {
    let query = req.query;
    res.send(`get 传值,id :${query.id}`);
});

app.listen(3000, '127.0.0.1');


