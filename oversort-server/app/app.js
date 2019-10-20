const path = require('path')
const express = require('express')
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const os = require('os');
const nodeId = Math.floor(Math.random()*0xffffff).toString(16);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('etag', false);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
});

app.get('/api/sorted', (req, res) => {
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

  array = array.sort();
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(array))
});

app.listen(port, () => console.log(`OverSort app listening on port ${port}! (NodeId: ${nodeId})`))
