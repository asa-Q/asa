 
function   RabbitMQPromise(queueName, errCallBack) {
        let self = this;
	self.queueName = queueName;
	self.amqp = require('amqplib');
        self.hosts = [];
        self.index = 0;
        self.length = self.hosts.length;
        self.open = amqp.connect(this.hosts[this.index]);
 
        self.open
            .then(function (conn) {
                return conn.createChannel();
            })
            .then(function (ch) {
		      return ch.assertQueue(queueName).then(function (ok) {

    return ch.consume(queueName, function (msg) {
      if (msg !== null) {

        console.log(msg.content.toString());
        ch.ack(msg);
      }
    });

  });
}).catch(console.warn);
};


module.exports = RabbitMQPromise; 
