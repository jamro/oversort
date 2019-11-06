const amqp = require('amqplib/callback_api');

class SortPublisher {

  constructor(rabbitHost) {
    this.rabbitHost = rabbitHost;
  }

  publish(sortId, input, output) {
    console.log("[SortPublisher] Connecting to message queue...");
    amqp.connect('amqp://' + this.rabbitHost, (err, connection) => {
      if(err) return console.error('[SortPublisher] ' + err);
      console.log('[SortPublisher] RabbitMQ connected');
      connection.createChannel((err, channel) => {
        if(err) return console.error('[SortPublisher] ' + err);
        console.log("[SortPublisher] Channel created");

        var queue = 'sortedResults';
        var msg = JSON.stringify({
          sortId,
          input,
          output
        });

        channel.assertQueue(queue, {
          durable: false
        });

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log("[SortPublisher] Sent %s", msg);

        setTimeout(() => {
          connection.close();
        }, 500);
      });
    })
  }

}

module.exports = SortPublisher;
