const express = require('express')
const bodyParser = require('body-parser')
const search = require('./search')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const port = process.env.PORT || 3000
let queryHistory = []

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/api/search', async function (req, res) {
  const address = req.query.address
  if (address) {
    try {
      let result = await search(address)
      queryHistory.push(result)
      res.json(result)
    } catch (error) {
      res.json({ error: error })
    }
  } else {
    res.json({ error: 'Address is empty.' })
  }
})

app.get('/api/history', function (req, res) {
  res.json(queryHistory)
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})