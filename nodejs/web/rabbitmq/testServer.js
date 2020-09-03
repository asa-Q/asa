var net = require('net');
var currQ = 'testQueue';

//var mq = require("../lib/RabbitMQSend.js");
//mq(currQ,'server',(error) =>
//{
//    console.log(error);
//});




var server = net.createServer(function (client) {
    console.log(' Client connection:');
    console.log(' local= %s:%s',client.localAddress,client.localPort);
    console.log(' remote= %s:%s',client._remoteAddress,client._remoteAddress);
    client.setTimeout(500);
    client.setEncoding('utf8');
    client.on('data', function (data) {
        console.log('Received data from client on port %d: %s', client.remotePort, data.toString());
        console.log('Bytes received:', client.bytesRead);
        writeData(client,'Sending:'+data.toString());
        console.log(' Bytes sent:' + client.bytesWritten);
    });
    client.on('end', function () {
        console.log('Client disconnected');
        server.getConnections(function (err, count) {
            console.log('Remaining Connection:' + count);
        });
    });
    client.on('error', function (err) {
        console.log('Socket Error:', JSON.stringify(err));
    });
    client.on('timeout', function () {
        console.log('Socket Timed Out');
    });
});
server.listen(8885, function () {
    console.log('Server listening: ' + JSON.stringify(server.address()));
    server.on('close', function () {
        console.log('Server Terminated');
    });
    server.on('error', function (err) {
        console.log('Server Error:', JSON.stringify(err));
    });
});
function writeData(socket,data) {
var mq = require("../lib/RabbitMQSend.js");
mq(currQ,data);
//mq = undefined;
	var success = !socket.write(data);
    if (!success) {
        (function(socket, data){
            socket.once('drain', function () {
                writeData(socket, data);

            });
        })(socket,data);
    }
}
