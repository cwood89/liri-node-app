// \n=new line - use to limit amount of console logs

require("dotenv").config();
var chalk = require("chalk")
var moment = require("moment");
var axios = require("axios");
var key = require("./keys.js");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(key.spotify);
var search = process.argv.slice(3).join(" ");
var searchC = process.argv.slice(3).join("");
var input = process.argv[2];
var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";


switch (input) {
    // spotify song search===========================================================================
    case "spotify-this-song":
        spotify.search({ type: 'track', query: search, limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log(chalk.redBright.bold("Song:"))
            console.log(data.tracks.items[0].name)
            console.log(chalk.redBright.bold("Artist:"));
            console.log(data.tracks.items[0].artists[0].name);
            console.log(chalk.redBright.bold("Spotify Link:"));
            console.log(data.tracks.items[0].external_urls.spotify);
            console.log(chalk.redBright.bold("Album:"));
            console.log(data.tracks.items[0].album.name);
        });
        break;
    // spotify artist search========================================================================
    case "spotify-this-artist":
        spotify.search({ type: 'artist', query: search, limit: 5 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log(chalk.redBright.bold("Artist:"))
            console.log(data.artists.items[0].name);
            console.log(chalk.redBright.bold("Genre:"))
            console.log(data.artists.items[0].genres[0]);
        });
        spotify.search({ type: 'track', query: search, limit: 5 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log(chalk.redBright.bold("Top Songs:"))
            for (var i = 0; i < data.tracks.items.length; i++) {
                console.log(data.tracks.items[i].name)
            }
        });
        break;
    // imdb movie search =======================================================================
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
    // bands in town search=========================================================================
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
        break;
    // do what it says=============================================================================
    case "do-what-it-says":

}
