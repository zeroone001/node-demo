const mongoClient = require('mongodb').MongoClient;

// 定义数据库链接的地址
const url = 'mongodb://zhangsan:123456@localhost:27017/?authSource=nowDB&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'

// 定义要操作的数据库
const DBName = 'nowDB';

const client = new mongoClient(url);

client.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('success');
    let db = client.db(DBName);

    // 查找数据
    // db.collection('order_item').find().toArray((err, data) => {
    //     console.log('----->', data);
    //     // 操作完毕之后，一定要关闭数据库
    //     client.close();
    // });

    // 增加数据
    const objData = {
        order_id: 4,
        uid: 5,
        trade_no: '123',
        all_price: 321,
        all_num: 22
    };
    // db.collection('order').insertOne(objData, (err, data) => {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }

    //     console.log(data);
    //     client.close();
    // });

    // 更新数据
    // db.collection('order').updateOne({'order_id': 4}, {$set: {'all_price': 1234}}, (err, result) => {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //     console.log('更新数据成功--->', result);
    //     client.close();
    // });

    // 删除多条数据
    db.collection('order').deleteMany({'order_id': 4}, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('删除一条数据成功');
        client.close();
    });

});
