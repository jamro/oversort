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
  let response = `
  <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
  <script>
    function submit() {
      let data = $('#inputData').val();
      data = data.split("\\n");
      data = JSON.stringify(data);
      $.get('./api/sorted?array=' + data, (response) => {
        response = response.join("\\n");
        $('#inputData').val(response);
      })
    }
  </script>
    <div>
      <textarea id="inputData" rows="10" cols="50"></textarea>
      <hr />
      <input type="submit" value="Sort Data" onclick="submit()"/>
    </div>
    <hr />
    <small>NodeID: ${nodeId} | <a href="/admin/" target="_blank">Admin Panel</a></small>
  `;
  res.send(response)
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
