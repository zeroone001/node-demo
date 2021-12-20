# freeCodeCamp

## 短网址微服务

```js
const bodyParser = require('body-parser');

let shortUrl = {};

app.route('/api/shorturl/:number').get((req, res) => {
  // res.redirect(shortUrl);
   for(let myKey in shortUrl){
    console.log(myKey);
    console.log(shortUrl[myKey]);
    if(shortUrl[myKey] === req.params.number){
        res.redirect(myKey);
        // res.redirect(req.headers.origin);
        res.end();
        break;
    }
  }
});

app.route('/api/shorturl').post((req, res) => {
  const url = req.body.url;
  if (/^https?:\/\/.+/.test(url)) {
    // shortUrl = url;
    shortUrl[url]=req.body.url.charAt(req.body.url.length-1);
    res.json({
      original_url: url,
      short_url: req.body.url.charAt(req.body.url.length-1)
    });
  } else {
    res.json({
      error: 'invalid url'
    });
  }
});
```

## 运动追踪器

```js

```