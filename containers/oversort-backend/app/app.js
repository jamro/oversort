const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const os = require('os');
const uuid = require('uuid/v4');

const Sorter = require('./lib/Sorter.js')
const SortPublisher = require('./lib/SortPublisher.js')
const StoreAPI = require('./lib/StoreAPI.js')

const app = express();
const nodeId = Math.floor(Math.random()*0xffffff).toString(16);

var config = {
  rabbitmq: {
    host: 'localhost'
  },
  store: {
    host: 'localhost',
    port: 3000
  },
  port: 3000
}

config.rabbitmq.host = process.env.OVERSORT_RABBIT_HOST ? process.env.OVERSORT_RABBIT_HOST : config.rabbitmq.host;
config.store.host = process.env.OVERSORT_STORE_HOST ? process.env.OVERSORT_STORE_HOST : config.store.host;
config.store.port = process.env.OVERSORT_STORE_PORT ? process.env.OVERSORT_STORE_PORT : config.store.port;
config.port = process.env.OVERSORT_PORT ? process.env.OVERSORT_PORT : config.port;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('etag', false);

app.post('/sorted', (req, res) => {
  let sortId = uuid();
  let array = req.body.array
  if(!array) {
    res.status(400)
    res.send("400 Bad Request: array parameter is required")
    return
  }
  console.log("Parsing JSON data...");
  try {
    array = JSON.parse(array)
  } catch(err) {
    console.error("Unable convert to JSON from: '" + array + "'");
    console.error(err);
    res.status(400)
    res.send("400 Bad Request: Invalid JSON format")
    return
  }
  console.log(`Sorting array with ${array.length} element(s)...`);
  let outputArray = JSON.parse(JSON.stringify(array));

  let sorter = new Sorter()
  outputArray = sorter.sort(outputArray);

  let publisher = new SortPublisher(config.rabbitmq.host);
  publisher.publish(sortId, array, outputArray)

  let response = {
    sortId,
    input: array,
    output: outputArray
  }

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(response))
});


app.get('/history/:sortId', async (req, res) => {
  let sortId = req.params.sortId
  if(!sortId) {
    res.status(400)
    res.send("400 Bad Request: sortId parameter is required")
    return
  }

  let api = new StoreAPI(`http://${config.store.host}:${config.store.port}`);
  try {
    let result = await api.getSortResult(sortId)
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result))
  } catch (err) {
    console.log("Error: " + err.message);
    res.status(500)
    res.send("500 Internal Error")
  }

});

app.listen(config.port, () => console.log(`OverSort Backend listening on port ${config.port}! (NodeId: ${nodeId})`))
