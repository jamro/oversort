const path = require('path')
const express = require('express')
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const os = require('os');
const uuid = require('uuid/v4');

const app = express();
const nodeId = Math.floor(Math.random()*0xffffff).toString(16);
const MongoClient = mongodb.MongoClient;

var config = {
  mongo: {
    host: 'localhost'
  },
  port: 3000
}

config.mongo.host = process.env.OVERSORT_MONGO_HOST ? process.env.OVERSORT_MONGO_HOST : config.mongo.host;
config.port = process.env.OVERSORT_PORT ? process.env.OVERSORT_PORT : config.port;

const mongoUrl = `mongodb://${config.mongo.host}`
const mongoOpts = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('etag', false);

app.get('/sorted', (req, res) => {
  let sortId = uuid();
  let array = req.query.array
  if(!array) {
    res.status(400)
    res.send("400 Bad Request: array parameter is required")
    return
  }
  try {
    array = JSON.parse(array)
  } catch(err) {
    console.error(err);
    res.status(400)
    res.send("400 Bad Request: Invalid JSON format")
    return
  }
  console.log(`Sorting array with ${array.length} element(s)...`);
  let outputArray = JSON.parse(JSON.stringify(array));

  outputArray = outputArray.sort();

  let response = {
    sortId,
    input: array,
    output: outputArray
  }

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

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(response))
});


app.get('/history', (req, res) => {
  let sortId = req.query.sortId
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

app.listen(config.port, () => console.log(`OverSort app listening on port ${config.port}! (NodeId: ${nodeId})`))
