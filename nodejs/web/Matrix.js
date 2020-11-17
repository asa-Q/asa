var ws = require("nodejs-websocket")

var port = 8887

var r_msg = ""


var server = ws.createServer(function (conn) {
	console.log("New connection")
	let mq = require("./lib/RabbitMQPromiseSend.js");
	mq('testQueue',server,(msg) =>
	{
})

	conn.on("text", function (str) {
	console.log("Received "+str)
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
	})
	conn.on("connect", function (code, reason) {
console.log("Connected");	
	})
	
	conn.on("error",function(err){
		console.log('handler error')
		console.log(err)
	})
}).listen(port)

console.log('websocket server listening on port ' + port)
