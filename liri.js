const dotEnv = require("dotenv").config();
const keys =require("./keys.js");

console.log(keys.spotify.id);
console.log(keys.spotify.secret);

//console.log(keys.someOtherKey.id);
console.log(keys.omdb.secret);

