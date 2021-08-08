const net = require('net');
const { setTimeout } = require('timers');

const data = {
    '123': '123123',
    '456': '456456'
}

const server = net.createServer((socket) => {
    socket.on('data', (buffer) => {
        const id = buffer.readInt32BE();
        console.log('id', id);
        setTimeout(() => {
            let newBuffer = Buffer.from(data[id]);

            console.log('newBuffer', newBuffer);
            socket.write(newBuffer); //这里注意是socket
        }, 500);
        
    })
});

server.listen(4001);