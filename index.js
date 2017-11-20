const express = require('express')
const bodyParser = require('body-parser')
const search = require('./search')
const path = require('path')

const MongoClient = require('mongodb').MongoClient;
const port = process.env.PORT || 3000

let mdb;
let historyCollection;
// Connect to the db
const mongoURL = 'mongodb://ggm:1235813@ds111496.mlab.com:11496/js-class-1116'
MongoClient.connect(mongoURL, async function (err, db) {
  console.log('mongodb connected')
  if (err) {
    return console.dir(err);
  }
  mdb = db;
  historyCollection = db.collection('history');
  runApp()
});

async function runApp() {
  const app = express()

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  app.use(bodyParser.json())

  app.use('/static', express.static(path.resolve(__dirname, 'static')))

  app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'views/index.html'))
  })

  app.get('/api/search', async function (req, res) {
    const address = req.query.address
    if (address) {
      try {
        let result = await search(address)
        historyCollection.insert(result)
        res.json(result)
      } catch (error) {
        res.json({ error: error })
      }
    } else {
      res.json({ error: 'Address is empty.' })
    }
  })

  app.get('/api/history', async function (req, res) {
    try {
      let results = await historyCollection.find({}).toArray()
      res.json(results)
    } catch (error) {
      console.trace(error)
      res.json(error)
    }
  })

  app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
  })
}

