const express = require('express')
const bodyParser = require('body-parser')
const search = require('./search')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const port = process.env.PORT || 3000

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/api/search', async function (req, res) {
  const address = req.query.address
  if (address) {
    res.json(await search(address))
  } else {
    res.json({ error: 'Address is empty.' })
  }
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})