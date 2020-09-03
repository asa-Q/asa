 
function RabbitMQSend(queueName, msg, errCallBack) {
	let amqp = require('amqplib');
        let self = this;
	self.name = 'RabbitMQSend';
        self.hosts = [];
        self.index = 0;
        self.length = this.hosts.length;
        self.open = amqp.connect(this.hosts[this.index]);

 
        self.open
            .then(function (conn) {
                return conn.createChannel();
            })
            .then(function (channel) {
                return channel.assertQueue(queueName).then(function (ok) {
                    return channel.sendToQueue(queueName, new Buffer(msg), {
                        persistent: true
                    });
                })
                    .then(function (data) {
                        if (data) {
                            errCallBack && errCallBack("success");
                            channel.close();
                        }
                    })
                    .catch(function () {
                        setTimeout(() => {
                            if (channel) {
                                channel.close();
                            }
                        }, 500)
                    });
            })
            .catch(function () {
                let num = self.index++;
 
                if (num <= self.length - 1) {
                    self.open = amqp.connect(self.hosts[num]);
                } else {
                    self.index == 0;
                }
            });
    };

module.exports = RabbitMQSend;
