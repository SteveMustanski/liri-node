const dotEnv = require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const request = require("request");

const command = process.argv[2];
const thingToGet = process.argv[3];

// get song data from spotify if command === spotify-this-song
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
      console.log(`Track: '${thingToGet}' not found`)

    }
  });
}
// get a movie from OMDB if the command is 'movie-this'
if (command === 'movie-this') {
  let url = `http://www.omdbapi.com/?apikey=${keys.omdb.secret}&t=${thingToGet}`;
  request(url, function (error, response, body) {

    // If the request was successful...
    if (!error && response.statusCode === 200) {

      // Then log the body from the site!
      let movie = JSON.parse(body);
      console.log(`Title: ${movie.Title}`);
      console.log(`Year: ${movie.Year}`);
      console.log(`IMDB Rating: ${movie.imdbRating}`);
      console.log(`Rotten Tomatoes: ${movie.Ratings[1].Value}`);
      console.log(`Country: ${movie.Country}`);
      console.log(`Language: ${movie.Language}`);
      console.log(`Plot: ${movie.Plot}`);
      console.log(`Actors: ${movie.Actors}`);
    }
  });
}

// get a list of events from bands in town if the command is 'concert-this'
if (command === 'concert-this') {
  let url = `https://rest.bandsintown.com/artists/${thingToGet}/events?app_id=${keys.bands.id}`;
  request(url, function (error, response, body) {

    // If the request was successful...
    if (!error && response.statusCode === 200) {

      // Then log the body from the site!
      let bands = JSON.parse(body);
      // no events
      if (bands.length === 0) {
        console.log(`Sorry there are no upcomming events for ${thingToGet}`);
      }
      // loop through the results
      for (let i = 0; i < bands.length; i++) {
        console.log(`Venue: ${bands[i].venue.name}`);
        console.log(`Location: ${bands[i].venue.city}, ${bands[i].venue.region}`);
        console.log(`Location: ${bands[i].datetime}`);
        console.log(`******************`);
      }
    }
  });
}

