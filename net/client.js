const net = require('net');

const socket = new net.Socket({});

socket.connect({
    host: '127.0.0.1',
    port: 4001
});

let buffer = Buffer.alloc(4);

buffer.writeInt32BE('123');



socket.write(buffer);

socket.on('data', (bufferNew) => {
    console.log('buffer:::', bufferNew.toString());
});