## Node 小记

### fs

* readdirSync(文件路径) 返回：数组，里面的文件名，包含文件夹名和文件名
* lstatSync 同步 lstat(). 返回 fs.Stats 的实例。
* Stats实例 意思是获取文件信息
* lstatSync().isDirectory 是目录的话，返回true，否则返回false

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

## Undici4

在以前，request 是在 Node.js 中发送一个 HTTP 请求的首要选择，但是这个包在 2020 年 2 月 11 日已经标记为弃用。

现在， Node.js 官方推荐 Undici4 作为在 Node.js 中发送 HTTP 请求的推荐选择，它更快速、可靠且符合规范，下面是一个小 Demo：

```js
import { request } from 'undici'

const {
  statusCode,
  headers,
  trailers,
  body
} = await request('http://localhost:3000/code秘密花园')

console.log('response received', statusCode)
console.log('headers', headers)

for await (const data of body) {
  console.log('data', data)
}

console.log('trailers', trailers)
```