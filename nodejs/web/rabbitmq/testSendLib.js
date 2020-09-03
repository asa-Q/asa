let mq = require("../lib/RabbitMQSend.js");
var curArgv = [];
process.argv.forEach(function(arg,index){
	curArgv[index] = arg;
    console.log("argv["+index+"] ="+ arg);
});
console.log('start');
var currQ = curArgv[2];
if (currQ==undefined){
console.log("no message error!");
}else{

//console.log(currQ);
var sendMsg = curArgv[3];
if (sendMsg==undefined){
	sendMsg=currQ;
	currQ = 'testQueue';
}
mq(currQ,sendMsg,(error) =>
{
    console.log(error);
});
//process.exit();
};


