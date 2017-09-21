const path = require('path')
const express = require('express')
const request = require('request')
const getAddress = require('./get-address')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')

app.use('/static', express.static(
  path.resolve(__dirname, 'static')))

app.set('history', [{
  address: 'NTU',
  result: {
    formatted_address: '羅斯福路四段一號',
    lat: '123',
    lng: '456',
  }
}])

app.get('/history', function (req, res) {
  res.send(app.get('history'))
})

app.get('/home', function (req, res) {
  res.render('home', {
    title: 'hello world',
    menu: ['Features', 'Contact', 'About'],
  });
})

app.get('/', function (req, res) {
  res.sendFile(
    path.resolve(__dirname, 'views/index.html'))
})

// http://localhost:3000/query-address?address=NTU
app.get('/query-address', function (req, res) {
  let address = req.query.address
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=AIzaSyC-BIjjbLmwgBtY8VavL39X1Malo5oK_rw`
  request(url,
    function (error, response, body) {
      console.log('error:', error)
      console.log('statusCode:', response.statusCode)
      console.log('body:', body)
      let result = getAddress(JSON.parse(body))
      res.send(result)

      let history = app.get('history')
      history.push({ address, result })
      app.set('history', history)
    })
})

const getPlaceByGoolge = (location, type) => {
  let promise = new Promise((resolve, reject) => {
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
      if (error) { reject(error) }
      else { resolve(body) }
    })
  })
  return promise;
}

const getPlaceByFacebook = (center) => {
  let promise = new Promise((resolve, reject) => {
    let url = 'https://graph.facebook.com/v2.10/search'
    let options = {
      url: url,
      qs: {
        type: 'place',
        center: center,
        access_token: 'EAAYqprlhwr8BAPrUuCUIYO83soPiDsjZCb0qOW3xe9FZCrj6I0gtBPD2BgLNPGl0CJkX93HlME2Y9ZC1pU0RGm1eGKGhtqZBTYUgUaYklfD7VBUZAlQVuZB8zJAOwePXCRSDK0F8UNZCFbAUFOky8bH9wveNyZAz08kO87ir5yDJFHjnlq1ZBF1N94KtkT8GP4H6xNZAxWgEvswgZDZD',
        fields: 'about,name,description,category_list',
      },
      method: 'GET'
    }
    request(options, function (error, response, body) {
      if (error) { reject(error) }
      else { resolve(body) }
    })
  })
  return promise;
}


// /query-place?location=25.019127,121.541980&type=bar
app.get('/query-place', function (req, res) {
  let location = req.query.location
  let type = req.query.type
  let promise1 = getPlaceByGoolge(location, type)
  let promise2 = getPlaceByFacebook(location)
  Promise.all([promise1, promise2]).then((result) => {
    res.send({
      google: JSON.parse(result[0]),
      facebook: JSON.parse(result[1]),
    })
  });
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})