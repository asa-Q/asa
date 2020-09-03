 
function   RabbitMQReceive(queueName, receiveCallBack, errCallBack) {
        let self = this;
	self.amqp = require('amqplib');
        self.hosts = [];
        self.index = 0;
        self.length = self.hosts.length;
        self.open = amqp.connect(this.hosts[this.index]);
 
        self.open
            .then(function (conn) {
                return conn.createChannel();
            })
            .then(function (channel) {
                return channel.assertQueue(queueName)
                    .then(function (ok) {
                        return channel.consume(queueName, function (msg) {
                            if (msg !== null) {
                                let data = msg.content.toString();
                                channel.ack(msg);
                                receiveCallBack && receiveCallBack(data);
                            }
                        })
                            .finally(function () {
                                setTimeout(() => {
                                    if (channel) {
                                        channel.close();
                                    }
                                }, 500)
                            });
                    })
            })
            .catch(function () {
                let num = self.index++;
                if (num <= self.length - 1) {
                    self.open = amqp.connect(self.hosts[num]);
                } else {
                    self.index = 0;
                    self.open = amqp.connect(self.hosts[0]);
                }
            });
    };

module.exports = RabbitMQReceive; 
