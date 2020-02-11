const request = require('request');
const { googleKey } = require('../config/keys');

const callGeoApi = (address, callback) => {
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?key=${googleKey}&address=${address}`,
    json: true
  }, (err, res, body) => {
    if (err) return callback("Cannot connect to server");

    if (body.status === "ZERO_RESULTS") return callback("Address not found")

    const formatted_address = body.results[0].formatted_address;
    const lat = body.results[0].geometry.location.lat;
    const lng = body.results[0].geometry.location.lng;
    const result = { formatted_address, lat, lng } // lat = lat, lng = lng

    callback(null, result)
  })
}

// callGeoApi("Ha Noi", (err, res) => {
//   if (err) return console.log(err)
//   return console.log(res)
// })

module.exports = {
  callGeoApi
}