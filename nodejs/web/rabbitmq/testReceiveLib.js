let mq = require("../lib/RabbitMQReceive.js");
mq('testQueue',(msg) =>
{
    console.log(msg)//123
})
