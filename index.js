const os = require('os');
const EventEmitter = require('events').EventEmitter;
const glob = require('glob');


class TheTime extends EventEmitter {
    constructor () {
        super();
        setInterval(() => {
            this.emit('look', {price: '123'});
        }, 2000);
    }
}

const gee = new TheTime();

gee.addListener('look', (res) => {
    console.log('res', res);
});


console.log(os.arch()); // 系统架构
// console.log(os.cpus()); 
console.log(process.argv);



console.time('glob'); // 查看耗时

const result = glob.sync(__dirname + '/**/*');
console.log('result', result);

console.timeEnd('glob');
