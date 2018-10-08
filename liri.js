const dotEnv = require("dotenv").config();
const keys = require("./keys.js");
var Spotify = require('node-spotify-api');

const command = process.argv[2];
const thingToGet = process.argv[3];
if (command === 'spotify-this-song') {

  // set up new spotify object for node-spotify-api
  var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });

  // search spotify using the api
  spotify.search({ type: 'track', query: thingToGet }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } else if (data.tracks.items[0] != undefined) {
      // console loge out the results from the first item in the array
      console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
      console.log(`Title: ${data.tracks.items[0].name}`);
      console.log(`Album: ${data.tracks.items[0].album.name}`);
      console.log(`Preview: ${data.tracks.items[0].preview_url}`);
    } else {
      console.log(`Track: ${thingToGet} not found`)

    }
  });
}

