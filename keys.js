console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.someOtherKey = {
  id: process.env.SECOND_ID,
  secret: process.env.SECOND_SECRET
};