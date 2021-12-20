# MongoDB 和 Mongoose

MongoDB是一个基于分布式文件存储的文档型数据库，MongoDB是一个介于关系数据库和非关系数据库之间的产品。

Mongoose是在node.js异步环境下对MongoDB进行便捷操作的对象模型工具，Mongoose是针对MongoDB操作的一个对象模型库，封装了MongoDB对文档的、增删改查等方法。

MongoDB最大的特点是它支持的查询语言非常强大，而且还支持对数据建立索引。

MongoDB是最原始的驱动，Mongoose是基于MongoDB的封装，Mongoose更节省代码量，MongoDB支持原生的MongoDB数据库的命令写法和最新的语法。

Mongoose只不过是封装了MongoDB的操作的一个对象模型库。

## 两种方法链接

app.js 和 index.js

mongoose: https://mongoosejs.com/docs/guide.html

## install

```js
mongodb@~3.6.0 

npm i mongoose@~5.4.0 --save
```

## 创建一个在线的数据库

https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/

mongodb+srv://yongshengliu:<password>@liuyongshengcluster.eqrck.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

```js

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://yongshengliu:<password>@liuyongshengcluster.eqrck.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

```

## 创建一个模型（Model）

### Schema

```js
const { Schema } = mongoose;

const personSchema = new Schema({
  name: {
    type: String,
    required: true
  },
age:  Number,
favoriteFoods: [String]
});
```

### model

```js
let Person = mongoose.model('Person', personSchema);
```

### documents

```js
const createAndSavePerson = (done) => {
  let person = new Person(
    {
      name: 'lys',
      age: 18,
      favoriteFoods: ['123']
    }
  );
  person.save(function(err, data) {
    //   ...do your stuff here...
    done(null, data);
  });
};
```

### Model.create() 创建多个实例

```js
var arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
      if (err) return console.log(err);
      done(null, data);
    });

};
```

### Model.find()

```js
Person.find({name: personName}, (err, data) => {
      if (err) return console.log(err);
      done(null, data);
    });
```
### findOne

```js
const findOneByFood = (food, done) => {
   Person.findOne({favoriteFoods: food}, (err, data) => {
      if (err) return console.log(err);
      done(null, data);
    });
};
```

### findById

```js
const findPersonById = (personId, done) => {
   Person.findById(personId, (err, data) => {
      if (err) return console.log(err);
      done(null, data);
    });
};
```

### 通过执行查询、编辑、保存来执行经典更新流程


```js
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);
    person.favoriteFoods.push(foodToAdd);

    person.save((err, data) => {
      if (err) return console.log(err);
      done(null, data);
    })
  });
};
```


### findOneAndUpdate

```js
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, data) => {
    if (err) return console.log(err);
     done(null, data);
  })
 
};
```

### findByIdAndRemove

```js
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return console.log(err);
     done(null, data);
  })
};
```

### remove

删除多条

```js
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  })
  
};
```

### 综合

select 不能传对象，否则报错

查找，排序，限制条数，选择显示哪几个属性，最后的回调

```js
const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select('name favoriteFoods').exec((err, data) => {
  if (err) return console.log(err);
    done(null, data);
  })
};
```

## base

```js
/*
    聚合管道

    对集合中的文档进行变换和组合

    实际项目： 表关联查询，数据的统计
*/
db.order_item.insertOne({order_id: 3, title: '牛奶6', price: 50, num: 1})

// $project 查询指定的字段
db.order.aggregate([{$project: {order_id: 1, all_price: 1}}])

// $match 操作 类似于find操作
db.order.aggregate([
    {$project: {order_id: 1, all_price: 1}},
    {
        $match: {
            'all_price': {$gte: 120}
        }
    }
])

// $group 将集合中的文档进行分组 可用于统计结果
db.order_item.aggregate([
    {
        $group: {
            _id: "$order_id",
            total: {$sum: '$num'}
        }
    }
])
// $sort 排序
db.order_item.aggregate([
    {
        $sort: {
            "price": -1
        }
    }
])
// $limit + $skip 分页操作
// $lookup
/*
    from: 跟哪个集合关联
    localField： 
*/
db.order.aggregate([
    {
        $lookup: {
            from: "order_item",
            localField: "order_id",
            foreignField: "order_id",
            as: "items" 
        }
    }
])
// 数据库的备份和还原
// mongodump -h 127.0.0.1 -d nowDB -o /Users/smzdm/beifen-db  -u zhangsan -p '123456'

// mongorestore -h 127.0.0.1 -d nowDB -o /Users/smzdm/beifen-db  -u zhangsan -p '123456'
```