//EZZC.js  Since 2020.08.17 12:59
var version = '2.0';
var port = 8884;

var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    ' <script src="http://39.107.238.138/statics/asa/js/message.js"></script>'+
    '</head>'+
    '<body>'+
    '<center>'+
    '<h6>Callback Function:::'+version+'</h6>'+
    '<textarea id="msg" name="msg" rows="8" cols="80"></textarea>'+
    '<form action="/" method="post">'+
    '<textarea name="text" rows="8" cols="80"></textarea>'+
    '<input type="hidden" name="project" value="asa"/><br>'+
    '<input type="submit" value="OK" style="font-size:20px"/>'+
    '</form></center>'+
    '<form action="http://39.107.238.138:8886/file" enctype="multipart/form-data" method="post">'+
    '<input type="file" name="file"/><br/>'+
    '<input type="submit" value="submit"/></form>'+
    '</body>'+
    '<script>ezzc();</script>'+
    '</html>';



var mqSend = require('./lib/RabbitMQSend.js');

var http = require('http');
var url = require('url');
var querystring = require('querystring')
var fs = require('fs');

var cmd = "read";
var msg = "none";
Date.prototype.Format = function (fmt) {  
var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
};
if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
for (var k in o)
if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
return fmt;
};

http.createServer(function(req, res) {
	var curtime = new Date().Format("yyyyMMddhhmmss");
	var fileName = "./logs/"+"ASA.txt";
	var writeString = "\n" + curtime; 
	send(res,body);
	memory(req,res,fileName,writeString);
}).listen(port);


console.log("HTTP server is listening at port 8884.");

function  send(response, content) { response.writeHead(200, { "content-type": "text/html" }); response.write(content); response.end(); };

function memory(req,res,fname,msg){
//console.log(msg);
req.setEncoding('utf-8');
var postData= "";
req.addListener("data",function(postDataChunk){
	postData += postDataChunk;
		});

req.addListener("end",function(){
	var curtime = new Date().Format("yyyyMMddhhmmss");
//	console.log("Data received.");
	var params = querystring.parse(postData);
//	console.log(params["text"]);
	var project = params["project"];
	var msg = params["text"];
	    cmsg = String(msg);
//	    msg = cmsg.substring(0,cmsg.length-2);
	    msg = cmsg;
//            msg = curtime+'\n'+msg+'\n'
            msg = msg+'\n'
	if(project == 'asa'){
//		console.log("write to file");
		//fs.writeFileSync(fname,msg);
		//
mqSend('testQueue',msg, (error) => {
    console.log(error)
});

		fs.appendFile(fname,msg,function(err){

			if(err) throw err;
				
		});


	};
		});

};
