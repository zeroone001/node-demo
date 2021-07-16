const fs = require('fs');
// const mkdirp = require('mkdirp');

/*
// fs.stat('../demo1', (err, data) => {
//     console.log('dataisDirectory', data.isDirectory());
//     console.log('dataisFile', data.isFile());
// });
// 判断服务器有没有这个目录
const pathThe = './upload';
fs.stat(pathThe, (err, data) => {
    if (err) {
        console.log('err----->', err);
        // 一开始走入这里
        mkdir();
        return;
    }
    if (!data.isDirectory()) {
        // 假如upload是个文件，先删除文件，再创建一个目录
        console.log('1');
        fs.unlink(pathThe, (error) => {
            console.log('3');
            if (error) {
                console.log('error', error);
            } else {
                console.log('4');
                // 创建目录
                mkdir();
            }
        });
    } else {
        console.log('目录存在');
    }
}); 

function mkdir () {
    fs.mkdir(pathThe, (e) => {
        if (e) {
            console.log(e);
        }
    });
}
*/


/*
    // 使用第三方依赖
    // 创建一个目录
    const pathThe = './upload';
    mkdirp(pathThe).then(made =>
        console.log(`made directories, starting with ${made}`));
*/



/*

// fs 中的流 读取一个文件
const readStream = fs.createReadStream('../aaa.html');
let str = '';
let count = 0;

readStream.on('data', (data) => {
    str+=data;
    count++
});
readStream.on('end', () => {
    console.log('str', str);
    console.log('count', count);
});
readStream.on('error', () => {
    console.log('error', error); 
});

*/




/*
// createWriteStream 创建一个文件

const writeStream = fs.createWriteStream('./ttt.txt');

writeStream.write('12312412');

writeStream.end();

writeStream.on('finish', () => {
    console.log('finish');
});
*/




// 管道流 用于复制大文件, 解决大文件的复制问题
// 同样可以复制压缩包

const readStream = fs.createReadStream('../bg_illustation.png');
const writeStream = fs.createWriteStream('./upload/aaa.png');
readStream.pipe(writeStream);



