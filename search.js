const rp = require("request-promise")
const getInfo = require("./getInfo")

const KEY = 'AIzaSyBImOy7k7q3nRG0YOcN2Z4GfQDu3q7WYNE'

const searchRestaurant = async address => {
  address = encodeURI(address)
  let addressUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${KEY}`

  let addressBody = await rp(addressUrl)
  let { lat, lng } = getInfo(JSON.parse(addressBody))
  let location = `${lat},${lng}`
  let placeUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=500&type=restaurant&key=${KEY}`

  let placeBody = await rp(placeUrl)
  placeBody = JSON.parse(placeBody)
  let places = placeBody.results.map(element => {
    return {
      name: element.name,
      rating: element.rating
    }
  })
  return places
}

module.exports = searchRestaurant