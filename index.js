const express = require('express')
const request = require('request')
const getAddress = require('./get-address')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')

app.get('/home', function (req, res) {
  res.render('home', {
    title: 'hello world',
    menu: ['Features', 'Contact', 'About'],
  });
})

app.get('/', function (req, res) {
  res.send('Hello World!')
})

// http://localhost:3000/query-address?address=NTU
app.get('/query-address', function (req, res) {
  let address = req.query.address
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`
  request(url,
    function (error, response, body) {
      console.log('error:', error)
      console.log('statusCode:', response.statusCode)
      console.log('body:', body)
      res.send(getAddress(JSON.parse(body)))
    })
})

// /query-place?location=25.019127,121.541980&type=bar
app.get('/query-place', function (req, res) {
  let location = req.query.location
  let type = req.query.type
  let url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
  let options = {
    url: url,
    qs: {
      key: 'AIzaSyBjSOxQ59gfngBwu4HMZZS8XrJMmIvt5q0',
      location: location,
      radius: '1000',
      type: type,
    },
    method: 'GET'
  }
  request(options, function (error, response, body) {
    console.log('error:', error)
    console.log('statusCode:', response.statusCode)
    console.log('body:', body)
    res.send(body)
  })
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})