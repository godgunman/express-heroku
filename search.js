const rp = require("request-promise")
const getInfo = require("./getInfo")

const KEY = process.env.KEY || 'AIzaSyBImOy7k7q3nRG0YOcN2Z4GfQDu3q7WYNE'

const searchRestaurant = async address => {
  let addressUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${KEY}`

  let addressBody = await rp(addressUrl)
  let { lat, lng, formatted_address } = getInfo(JSON.parse(addressBody))
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
  return {
    queryAddress: address,
    formattedAddress: formatted_address,
    lat,
    lng,
    places,
  }
}

module.exports = searchRestaurant