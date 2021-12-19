## 工具

supervisor ： 不用每次都重新启动


npm init --yes


## 依赖

* [get-value](https://www.npmjs.com/package/get-value)  Use property paths like 'a.b.c' to get a nested value from an object. Even works when keys have dots in them (no other dot-prop library can do this!).




## 知识

* [微任务/宏任务/事件循环](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/?utm_source=html5weekly)
* [node事件循环](https://www.taopoppy.cn/node/one_eventLoop.html)

## RPC通信


## easy_sock

快速开发基于tcp连接的二进制网络协议接口的nodejs模块 
[https://www.npmjs.com/package/easy_sock](https://www.npmjs.com/package/easy_sock)


## RESTful

## GraphQL

[https://www.npmjs.com/package/graphql](https://www.npmjs.com/package/graphql)
专注数据聚合，前端需要什么就返回什么

## BFF 应用BFF层


## express

### express.static

https://expressjs.com/en/guide/using-middleware.html

中间件

```js
/* 中间件， 注意 next */
app.use(function(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use('/public', express.static(process.cwd() + '/public'));


```

### 通过链式调用中间件来创建时间服务

```js
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time
    });
  }
);
```

### params

```js
app.get('/:word/echo', function(req, res) {
  res.json({echo: req.params.word});
});
```

### query 

```js
app.route('/name').get((req, res) => {
  res.json({
    name: `${req.query.first} ${req.query.last}`
  })
});
```

### post

multipart/form-data， 它被用来上传二进制文件

```js
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.route('/name').get((req, res) => {
  res.json({
    name: `${req.query.first} ${req.query.last}`
  })
}).post((req, res) => {
  res.json({
    name: `${req.body.first} ${req.body.last}`
  })
});
```