var ws = require("nodejs-websocket")

var port = 8887

var r_msg = ""


var server = ws.createServer(function (conn) {
	console.log("New connection")
	conn.on("text", function (str) {
	let mq = require("./lib/RabbitMQPromiseSend.js");
	mq('testQueue',conn,str,(msg) =>
	{
})
//		console.log("Received "+str)
	//	conn.sendText('{"data":"'+str+'",'+'"msg":"'+r_msg+'"}')
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
	})
	
	conn.on("error",function(err){
		console.log('handler error')
		console.log(err)
	})
}).listen(port)

console.log('websocket server listening on port ' + port)
