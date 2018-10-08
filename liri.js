const dotEnv = require("dotenv").config();
const keys =require("./keys.js");
var Spotify = require('node-spotify-api');

//console.log(keys.spotify.id);
//console.log(keys.spotify.secret);


//console.log(keys.omdb.secret);


 
var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});
 
spotify.search({ type: 'track', query: 'Run to the Hills' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
//console.log(data.tracks.items[0]); 
console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
console.log(`Title: ${data.tracks.items[0].name}`);
console.log(`Album: ${data.tracks.items[0].album.name}`);
console.log(`Preview: ${data.tracks.items[0].preview_url}`);


});

