const path = require('path')
const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const os = require('os');
const uuid = require('uuid/v4');
const amqp = require('amqplib/callback_api');
const redis = require("redis");

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
  redis: {
    host: 'localhost',
    port: 6379
  },
  port: 3000
}

config.mongo.host = process.env.OVERSORT_MONGO_HOST ? process.env.OVERSORT_MONGO_HOST : config.mongo.host;
config.rabbitmq.host = process.env.OVERSORT_RABBIT_HOST ? process.env.OVERSORT_RABBIT_HOST : config.rabbitmq.host;
config.redis.host = process.env.OVERSORT_REDIS_HOST ? process.env.OVERSORT_REDIS_HOST : config.redis.host;
config.redis.port = process.env.OVERSORT_REDIS_PORT ? process.env.OVERSORT_REDIS_PORT : config.redis.port;
config.port = process.env.OVERSORT_PORT ? process.env.OVERSORT_PORT : config.port;

let redisClient = redis.createClient(config.redis.port, config.redis.host);
redisClient.on("error", function (err) {
  console.error(`Unable to connect to redis: ${err}`);
});


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

app.get('/sorted/:sortId', async (req, res) => {
  try {
    let sortId = req.params.sortId
    if(!sortId) {
      res.status(400)
      res.send("400 Bad Request: sortId parameter is required")
      return
    }

    console.log(`Getting sort history for ${sortId}...`);

    let getCache = () => new Promise((resolve, reject) => {
      redisClient.get(sortId, (error, result) => {
        if (error) {
          console.console.error(error);
          return resolve(null)
        }
        resolve(result)
      });
    })

    let cacheData = redisClient.connected ? await getCache() : null;

    if(cacheData) {
      console.log(`Returning cached data...`);
      res.setHeader('Content-Type', 'application/json');
      res.send(cacheData)
      return;
    }


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
          return;
        }
        let sortedList = {
          sortId,
          input: result.input,
          output: result.output,
        };
        console.log("Caching response");
        if(redisClient.connected) {
          redisClient.set(sortId, JSON.stringify(sortedList), redis.print)
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(sortedList))

        client.close();
        console.log('MongoDB connection closed');
      })
    })
  } catch (err) {
    console.error("Unable to get sorted list");
    console.error(err);
  }
});

app.listen(config.port, () => console.log(`OverSort Store listening on port ${config.port}! (NodeId: ${nodeId})`))
