const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000

app.use(express.static('./dist'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/sorted', (req, res) => {
  res.send({
    "sortId": "bf04ec3e-1db2-4a43-9f6a-ce01ccf293dd",
    "input": ["gamma", "beta", "zetta", "alpha"],
    "output": ["alpha", "beta", "gamma", "zetta"]
  })
})

app.get('/api/history/:sortId', (req, res) => {
  res.send({
    "sortId": "b000000e-1db2-4a43-9f6a-ce01ccf293dd",
    "input": ["zebra", "dog", "cat", "bird"],
    "output": ["bird", "cat", "dog", "zebra"]
  })
})

app.listen(port, () => console.log(`mock server listening on port ${port}!`))
