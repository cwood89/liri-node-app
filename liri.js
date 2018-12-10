require("dotenv").config();
var chalk = require("chalk");
var moment = require("moment");
var axios = require("axios");
var key = require("./keys.js");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(key.spotify);
var search = process.argv.slice(3).join(" ");
var input = process.argv[2];

function searchLiri() {
    switch (input) {
        // do what it says=============================================================================
        case "do-what-it-says":
            read();
            break;
        // spotify song search===========================================================================
        case "spotify-this-song":
            if (!search) {
                search = "The Sign Ace of Base"
            }
            spotify.search({ type: 'track', query: search, limit: 1 }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);

                } else {
                    var jsonData = data.tracks.items[0];
                    var output = [
                        "Song: " + jsonData.name,
                        "Artist: " + jsonData.artists[0].name,
                        "Spotify Link: " + jsonData.external_urls.spotify,
                        "ALbum: " + jsonData.album.name
                    ].join("\n\n");

                    console.log(`${chalk.redBright.bold("Song:")}
${jsonData.name} 
${chalk.redBright.bold("Artist:")}
${jsonData.artists[0].name}
${chalk.redBright.bold("Spotify Link:")}
${jsonData.external_urls.spotify}
${chalk.redBright.bold("Album:")}
${jsonData.album.name}`);
                    write(output);
                };

            });

            break;
        // spotify artist search========================================================================
        case "spotify-this-artist":
            if (!search) {
                search = "Tame Impala"
            }
            spotify.search({ type: 'artist', query: search, limit: 5 }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                } else {
                    var jsonData = data.artists.items[0];
                    console.log(`${chalk.redBright.bold("Artist:")}
${jsonData.name}
${chalk.redBright.bold("Genre:")}
${jsonData.genres[0]}`)
                };
                var output = [
                    "Artist: " + jsonData.name,
                    "Genre: " + jsonData.genres[0]
                ].join("\n\n");
                write(output)
            });

            spotify.search({ type: 'track', query: search, limit: 5 }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                } else {
                    console.log(chalk.redBright.bold("Top Songs:"))
                    for (var i = 0; i < data.tracks.items.length; i++) {
                        console.log(data.tracks.items[i].name)
                    }
                };

            });


            break;
        // imdb movie search =======================================================================
        case "movie-this":
            if (!search) {
                search = "Mr Nobody"
            }
            var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";
            axios.get(queryUrl).then(function (response) {
                var data = response.data
                var output = [
                    "Title: " + data.Title,
                    "Year: " + data.Year,
                    "IMDB Rating: " + data.Ratings[0].Value,
                    "Rotten Tomatoes Rating: " + data.Ratings[1].Value,
                    "Country: " + data.Country,
                    "Language: " + data.Language,
                    "Plot: " + data.Plot,
                    "Actors: " + data.Actors
                ].join("\n\n");
                write(output)
                console.log(`${chalk.redBright.bold("Title:")}
${data.Title}
${chalk.redBright.bold("Year:")}
${data.Year}
${chalk.redBright.bold("IMDB Rating:")}
${data.Ratings[0].Value}
${chalk.redBright.bold("Rotten Tomatoes Rating:")}
${data.Ratings[1].Value}
${chalk.redBright.bold("Country:")}
${data.Country}
${chalk.redBright.bold("Language:")}
${data.Language}
${chalk.redBright.bold("Plot:")}
${data.Plot}
${chalk.redBright.bold("Actors:")}
${data.Actors}`)

            })
            break;
        // bands in town search=========================================================================
        case "concert-this":
            if (!search) {
                search = "Tame Impala"
            }
            var searchC = search.split(" ").join("");
            axios.get("https://rest.bandsintown.com/artists/" + searchC + '/events?app_id=codingbootcamp')
                .then(function (response) {
                    var data = response.data[0]
                    var output = [
                        "Artist: " + data.lineup[0],
                        "Next Show: " + moment(data.datetime).format("MM/DD/YYYY"),
                        "Venue: " + data.venue.name,
                        "Location: " + data.venue.city + ", " + data.venue.region
                    ].join("\n\n");
                    write(output)
                    console.log(`${chalk.redBright.bold("Artist:")}
${data.lineup[0]}
${chalk.redBright.bold("Next Show:")}
${moment(data.datetime).format("MM/DD/YYYY")}
${chalk.redBright.bold("Venue:")}
${data.venue.name}
${chalk.redBright.bold("Location:")}
${data.venue.city}, ${data.venue.region}`);

                })

            break;
    };
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

        };
    });
};

function write(x) {
    var divider = "\n------------------------------------------------------------\n\n";
    fs.appendFile("log.txt", x + divider, function (err) {
        if (err) {
            console.log(err);
        }

    });
};
searchLiri()
