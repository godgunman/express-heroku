const express = require('express')
const bodyParser = require('body-parser')
const search = require('./search')
const path = require('path')

const MongoClient = require('mongodb').MongoClient;

let mdb;
// Connect to the db
const mongoURL = 'mongodb://ggm:1235813@ds111496.mlab.com:11496/js-class-1116'
MongoClient.connect(mongoURL, async function (err, db) {
  if (err) {
    return console.dir(err);
  }
  let collection = db.collection('test');
  // let doc1 = { 'hello': 'doc1' };
  // let doc2 = { 'hello': 'doc2' };
  // let lotsOfDocs = [{ 'hello': 'doc3' }, { 'hello': 'doc4' }];

  // collection.insert(doc1);
  // collection.insert(doc2, { w: 1 }, function (err, result) { });
  // collection.insert(lotsOfDocs, { w: 1 }, function (err, result) { });
  let cursor = collection.find({ hello: 'doc1' });
  let item = await cursor.nextObject();
  console.log(item);
  item = await cursor.nextObject();
  console.log(item);
  item = await cursor.nextObject();
  console.log(item);
  
  mdb = db;
});

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const port = process.env.PORT || 3000
let queryHistory = []

app.use('/static', express.static(path.resolve(__dirname, 'static')))

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'views/index.html'))
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