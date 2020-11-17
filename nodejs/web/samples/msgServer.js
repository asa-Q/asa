var http = require("http");
var ws = require("nodejs-websocket");
var fs = require("fs");
 
var server = ws.createServer(function (conn) {
	console.log("connection sussess");
	conn.on("text", function (str) {
		server.connections.forEach(function (connection) {
			connection.sendText(str);
		});
	});
});
server.listen(8887);//设置服务器端口
