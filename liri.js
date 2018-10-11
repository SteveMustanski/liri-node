const dotEnv = require('dotenv').config();
const keys = require('./keys.js');
const Spotify = require('node-spotify-api');
const request = require('request');
const moment = require('moment');
const fs = require('fs');

//get arguments from the command line
let command = process.argv[2];
let thingToGet = process.argv[3];

if (command === 'do-what-it-says') {
  fs.readFile('random.txt', 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }
    data = data.split(',');
    command = data[0];
    thingToGet = data[1];
    // choose action based on command in file
    if (command === 'spotify-this-song') {
      spotifyIt(thingToGet);
    };
    if (command === 'movie-this') {
      moveIt(thingToGet);
    }
    if (command === 'concert-this') {
      let thingToGetFix = thingToGet.slice(1, -1);
      concertIt(thingToGetFix);
    }

  });
}
// get song data from spotify if command === spotify-this-song
if (command === 'spotify-this-song') {
  spotifyIt(thingToGet);
}
// get a movie from OMDB if the command is 'movie-this'
if (command === 'movie-this') {
  moveIt(thingToGet);
}

// get a list of events from bands in town if the command is 'concert-this'
if (command === 'concert-this') {
  concertIt(thingToGet);
}

// function to run spotify package and print out information
function spotifyIt(song) {
  // set up new spotify object for node-spotify-api
  var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });

  // search spotify using the api
  spotify.search({ type: 'track', query: song }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } else if (data.tracks.items[0] != undefined) {
      // console loge out the results from the first item in the array
      console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
      console.log(`Title: ${data.tracks.items[0].name}`);
      console.log(`Album: ${data.tracks.items[0].album.name}`);
      console.log(`Preview: ${data.tracks.items[0].preview_url}`);
    } else {
      console.log(`Track: '${song}' not found`)

    }
  });
}

// fucntion to get movie information and print it out to console
function moveIt(title) {
  // default to 'Mr. Nobody' if no movie is specified
  if (!title) {
    title = 'Mr. Nobody';
  }
  let url = `http://www.omdbapi.com/?apikey=${keys.omdb.secret}&t=${title}`;
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

// fucntion to get concert information
function concertIt(artist) {
  let url = `https://rest.bandsintown.com/artists/${artist}/events?app_id=${keys.bands.id}`;
  request(url, function (error, response, body) {

    // If the request was successful...
    if (!error && response.statusCode === 200) {

      // Then log the body from the site!
      let bands = JSON.parse(body);
      // check for no events
      if (bands.length === 0) {
        console.log(`Sorry there are no upcomming events for ${artist}`);
      }
      // loop through the results
      for (let i = 0; i < bands.length; i++) {
        console.log(`Venue: ${bands[i].venue.name}`);
        console.log(`Location: ${bands[i].venue.city}, ${bands[i].venue.region}`);

        // modify format of incomming date time
        let justDate = bands[i].datetime.substring(0, 10);
        let printDate = convertDate(justDate);

        console.log(`Date: ${printDate}`)
        console.log(`******************`);
      }
    }
  });
}

// converts the incomming date string to the requested format
function convertDate(dateString) {
  let momentObj = moment(dateString, 'YYYY-MM-DD');
  let momentString = momentObj.format('MM/DD/YYYY');
  return momentString;
}

