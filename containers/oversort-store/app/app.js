const path = require('path')
const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const os = require('os');
const uuid = require('uuid/v4');
const amqp = require('amqplib/callback_api');

const app = express();
const nodeId = Math.floor(Math.random()*0xffffff).toString(16);
const MongoClient = mongodb.MongoClient;

var config = {
  mongo: {
    host: 'localhost'
  },
  rabbitmq: {
    host: 'localhost'
  },
  port: 3000
}

config.mongo.host = process.env.OVERSORT_MONGO_HOST ? process.env.OVERSORT_MONGO_HOST : config.mongo.host;
config.rabbitmq.host = process.env.OVERSORT_RABBIT_HOST ? process.env.OVERSORT_RABBIT_HOST : config.rabbitmq.host;
config.port = process.env.OVERSORT_PORT ? process.env.OVERSORT_PORT : config.port;

const mongoUrl = `mongodb://${config.mongo.host}`
const mongoOpts = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

function connectQueue() {
  let uri = 'amqp://' + config.rabbitmq.host;
  amqp.connect(uri, (err, connection) => {
    if(err) {
      console.error("Unable to connect to the message queue at " + uri + ": " + err.message);
      console.log("Retrying in 5s...");
      setTimeout(() => connectQueue(), 5000);
      return
    }
    console.log("Connected to Message Queue");
    connection.createChannel((err, channel) => {
      if(err) {
        console.error("Unable to create channel at message queue " + uri + ": " + err.message);
        console.log("Retrying in 5s...");
        setTimeout(() => connectQueue(), 5000);
        return
      }
      console.log("Message channel created");
      var queue = 'sortedResults';

      channel.assertQueue(queue, {
        durable: false
      });

      console.log("Waiting for messages from %s", queue);
      channel.consume(queue, function(msg) {
        console.log("Message Received %s", msg.content.toString());
        let response = JSON.parse(msg.content.toString())

        console.log(`Connecting to MongoDB at ${mongoUrl}`);
        MongoClient.connect(mongoUrl, mongoOpts, (err, client) => {
          if(err) {
            return console.error(err);
          }
          let db = client.db('oversort');

          console.log("Inserting to database...");
          db.collection('SortList').insertOne(response)
          client.close();
          console.log('MongoDB connection closed');
        })

      }, {
        noAck: true
      });
    });
  });
}

connectQueue();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('etag', false);

app.get('/sorted/:sortId', (req, res) => {
  let sortId = req.params.sortId
  if(!sortId) {
    res.status(400)
    res.send("400 Bad Request: sortId parameter is required")
    return
  }

  console.log(`Getting sort history for ${sortId}...`);

  console.log(`Connecting to MongoDB at ${mongoUrl}`);
  MongoClient.connect(mongoUrl, mongoOpts, (err, client) => {
    if(err) {
      res.status(500)
      res.send("500 Internal error")
      return console.error(err);
    }
    let db = client.db('oversort');

    console.log("Searching database...");
    db.collection('SortList').findOne({sortId}, (err, result) => {
      if(err) {
        res.status(500)
        res.send("500 Internal error")
        return console.error(err);
      }
      if(!result) {
        res.status(404)
        res.send("404 Not Found")
        return console.error(err);
      }

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
        sortId,
        input: result.input,
        output: result.output,
      }))

      client.close();
      console.log('MongoDB connection closed');
    })
  })

});

app.listen(config.port, () => console.log(`OverSort Store listening on port ${config.port}! (NodeId: ${nodeId})`))
