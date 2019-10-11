const express = require('express')
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const os = require('os');
const nodeId = Math.floor(Math.random()*0xffffff).toString(16);

function gennerateHtml(data) {
  data = data || '';
  return `
    <form action="./" method="post">
      <textarea name="inputData" rows="10" cols="50">${data}</textarea>
      <hr />
      <input type="submit" value="Sort Data" />
    </form>
    <!--
      NodeID: ${nodeId}
      Hostname: ${os.hostname()}
    -->
  `;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.send(gennerateHtml())
});

app.post('/', (req, res) => {
  let data = req.body.inputData;
  data = data.split("\n");
  console.log(`NodeId: ${nodeId}, Sorting ${data.length} elements`);
  data = data.sort();
  data = data.join("\n");
  res.send(gennerateHtml(data))
});

app.listen(port, () => console.log(`OverSort app listening on port ${port}! (NodeId: ${nodeId})`))
