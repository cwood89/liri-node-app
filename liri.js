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

function searchLiri() {
    switch (input) {
        // do what it says=============================================================================
        case "do-what-it-says":
            read();
            break;
        // spotify song search===========================================================================
        case "spotify-this-song":
            spotify.search({ type: 'track', query: search, limit: 1 }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                console.log(`${chalk.redBright.bold("Song:")}
${data.tracks.items[0].name} 
${chalk.redBright.bold("Artist:")}
${data.tracks.items[0].artists[0].name}
${chalk.redBright.bold("Spotify Link:")}
${data.tracks.items[0].external_urls.spotify}
${chalk.redBright.bold("Album:")}
${data.tracks.items[0].album.name}`)

            });

            break;
        // spotify artist search========================================================================
        case "spotify-this-artist":
            spotify.search({ type: 'artist', query: search, limit: 5 }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                console.log(`${chalk.redBright.bold("Artist:")}
${data.artists.items[0].name}
${chalk.redBright.bold("Genre:")}
${data.artists.items[0].genres[0]}`)

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
            var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";
            axios.get(queryUrl).then(
                function (response) {
                    console.log(`${chalk.redBright.bold("Title:")}
${response.data.Title}
${chalk.redBright.bold("Year:")}
${response.data.Year}
${chalk.redBright.bold("IMDB Rating:")}
${response.data.Ratings[0].Value}
${chalk.redBright.bold("Rotten Tomatoes Rating:")}
${response.data.Ratings[1].Value}
${chalk.redBright.bold("Country:")}
${response.data.Country}
${chalk.redBright.bold("Language:")}
${response.data.Language}
${chalk.redBright.bold("Plot:")}
${response.data.Plot}
${chalk.redBright.bold("Actors:")}
${response.data.Actors}`)

                })
            break;
        // bands in town search=========================================================================
        case "concert-this":
            var searchC = search.split(" ").join("");
            axios.get("https://rest.bandsintown.com/artists/" + searchC + '/events?app_id=codingbootcamp')
                .then(function (response) {
                    console.log(`${chalk.redBright.bold("Artist:")}
${response.data[0].lineup[0]}
${chalk.redBright.bold("Next Show:")}
${moment(response.data[0].datetime).format("MM/DD/YYYY")}
${chalk.redBright.bold("Venue:")}
${response.data[0].venue.name}
${chalk.redBright.bold("Location:")}
${response.data[0].venue.city + ", " + response.data[0].venue.region}`)

                })
            break;
    }
};
function read() {
    fs.readFile("random.txt", "utf-8", function (error, data) {
        if (error) {
            return console.log(error)
        } else {
            var dataArr = data.split(",")
            input = dataArr[0];
            if (dataArr[1].charAt(0) === '"' && dataArr[1].charAt(dataArr[1].length - 1) === '"') {
                search = dataArr[1].substr(1, dataArr[1].length - 2);
            } else {
                search = dataArr[1];
            }
            console.log(chalk.greenBright.bold(input, search))
            searchLiri();

        }
    })
};
searchLiri();
