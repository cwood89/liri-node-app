require("dotenv").config();
var chalk = require("chalk")
var moment = require("moment");
var axios = require("axios");
var key = require("./keys.js");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(key.spotify);
const { g, b, gr, r, y } = require("./console");
var search = process.argv.slice(3).join(" ");
var searchC = process.argv.slice(3).join("");
var input = process.argv[2];
var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";

// spotify = spotify-this-(song, artist)
switch (input) {
    case "spotify-this-song":
        spotify.search({ type: 'track', query: search, limit: 2 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log(chalk.redBright.bold("Song:"))
            console.log(data.tracks.items[0].name)
            console.log(chalk.redBright.bold("Artist:"));
            console.log(data.tracks.items[0].artists[0].name);
            console.log(chalk.redBright.bold("Preview:"));
            console.log()
        });
        break;
    case "spotify-this-artist":

        break;
    case "movie-this":
        axios.get(queryUrl).then(
            function (response) {
                console.log(chalk.redBright.bold("Title:"));
                console.log(response.data.Title);
                console.log(chalk.redBright.bold("Year:"));
                console.log(response.data.Year);
                console.log(chalk.redBright.bold("IMDB Rating:"));
                console.log(response.data.Ratings[0].Value);
                console.log(chalk.redBright.bold("Rotten Tomatoes Rating:"));
                console.log(response.data.Ratings[1].Value);
                console.log(chalk.redBright.bold("Country:"));
                console.log(response.data.Country);
                console.log(chalk.redBright.bold("Language:"));
                console.log(response.data.Language);
                console.log(chalk.redBright.bold("Plot:"));
                console.log(response.data.Plot);
                console.log(chalk.redBright.bold("Actors:"));
                console.log(response.data.Actors);
            })
        break;
    case "concert-this":
        axios.get("https://rest.bandsintown.com/artists/" + searchC + '/events?app_id=codingbootcamp')
            .then(function (response) {
                console.log(chalk.redBright.bold("Artist:"));
                console.log(response.data[0].lineup[0]);
                console.log(chalk.redBright.bold("Next Show:"));
                console.log(moment(response.data[0].datetime).format("MM/DD/YYYY"))
                console.log(chalk.redBright.bold("Venue:"));
                console.log(response.data[0].venue.name);
                console.log(chalk.redBright.bold("Location:"));
                console.log(response.data[0].venue.city + ", " + response.data[0].venue.region)
            })


}


// bands = axios concert-this
// movie = axios movie-this