const request = require('request');

const darkSky = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/b8164e69c9f7fbc654f20d2d6381d1fc/${lat},${lng}`,
    json: true
  }, (err, res, body) => {
    if (err) return callback("Cannot connect to Darksky API")
    if (body.code === 400) return callback("Location not found")

    const summary = body.currently.summary;
    const temperature = body.currently.temperature;
    callback(null, {
      summary, temperature
    })
  })
}

// darkSky(21.0277644, 100, (err, res) => {
//   if (err) return console.log(err)
//   return console.log(res)
// })

module.exports = {
  darkSky
}