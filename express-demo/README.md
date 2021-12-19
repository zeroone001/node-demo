## features

* 强大的路由
* http协助请求（重定向，缓存）
* 支持模板引擎


## req.headers

https://blog.csdn.net/qq_32442967/article/details/103381566

```js

app.route('/api/whoami').get((req, res) => {
  res.json({
    ipaddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    language: req.headers["accept-language"],
    software: req.headers['user-agent'] 
  })
});
```