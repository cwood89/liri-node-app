require("dotenv").config();
var moment = require('moment');
var axios = require("axios");
var key = require("./keys.js");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(spotify);
const { g, b, gr, r, y } = require("./console");
var search = process.argv.slice(3).join("")
var input = process.argv[2]
console.log(r(key))
// var spotify = new Spotify({
//     id: <your spotify client id>,
//     secret: <your spotify client secret>
//   });

// spotify = spotify-this-(song, artist)
var spotifySearch = {
    song: function () {
        if (input === "spotify-this-song") {
            spotify.search({ type: 'track', query: search }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log(r(data));
            });
        }
    },
    artist: function () {
        if (input === "spotify-this-artist") {
            spotify.search({ type: 'artist', query: search }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log(r(data));
            });
        }
    },
};

// bands = axios concert-this
// movie = axios movie-this