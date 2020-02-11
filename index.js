const { callGeoApi } = require('./services/callGeoApi')
const { darkSky } = require('./services/callDarskyAPI');

const yargs = require('yargs');

const argv = yargs.options({
  a: {
    alias: "address",
    demand: true,
    string: true,
    describe: "Please, enter the your address"
  }
})
  .help()
  .alias('h', 'help')
  .argv;

const address = argv.address

callGeoApi(address, (err1, res1) => {
  if (err1) return console.log(err1)

  console.log("Address: ", res1.formatted_address)
  darkSky(res1.lat, res1.lng, (err2, res2) => {
    if (err2) return console.log(err2)

    console.log(res2)
  })
})