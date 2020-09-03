var net = require('net');
var port = 8885;
var host = '39.107.238.138';
var client= new net.Socket();

var curArgv = [];
process.argv.forEach(function(arg,index){
        curArgv[index] = arg;
//    console.log("argv["+index+"] ="+ arg);
});



//创建socket客户端
client.setEncoding('binary');
//连接到服务端
client.connect(port,host,function(){
 client.write(curArgv[2]);
 //向端口写入数据到达服务端
});
client.on('data',function(data){
 console.log('from server:'+ data);
process.exit(1); 
	//得到服务端返回来的数据
});
client.on('error',function(error){
//错误出现之后关闭连接
 console.log('error:'+error);
});
client.on('close',function(){
//正常关闭连接
 console.log('Connection closed');
});
