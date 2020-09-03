let mq = require("../lib/RabbitMQPromise.js");
mq('testQueue',(msg) =>
{
    console.log(msg)//123
})
