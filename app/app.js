const express = require('express')
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

function gennerateHtml(data) {
  data = data || '';
  return `
    <form action="./" method="post">
      <textarea name="inputData" rows="10" cols="50">${data}</textarea>
      <hr />
      <input type="submit" value="Sort Data" />
    </form>
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
  data = data.sort();
  data = data.join("\n");
  res.send(gennerateHtml(data))
});

app.listen(port, () => console.log(`OverSort app listening on port ${port}!`))
