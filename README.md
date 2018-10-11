# liri-node
## Liri Bot Project
This repo contains the code for a bootcamp project "Liri Bot".  LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## APIs Used
* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
* [OMDB API](http://www.omdbapi.com)
* [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

## Dependencies
* dotenv
* node-spotify-api
* request
* moment

## Set up
To set up the app, in addition to cloning the repo, you will need to set up a .env file for the APIs to work.  Running "npm install" will install the dependencies, but you will need to get your own keys for each of the APIs.

The .env file will look like:

```javascript
# Spotify API keys

SPOTIFY_ID="your spotify id"
SPOTIFY_SECRET="your spotify key"

# OMDB API keys

OMDB_SECRET="your omdb key"

# Bands in town keys

BANDS_ID="your bands id"
```

## Running the app
The user can enter the following commands:

* `node liri.js 'concert-this' 'name of a band'`
* `node liri.js 'spotify-this-song' 'name of song'`
* `node liri.js 'movie-this' 'name of movie'`
* `node liri.js 'do-what-it-says'`

'do-what-it-says' will read the random.txt file and execute the command found there.

