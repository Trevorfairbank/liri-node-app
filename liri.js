require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
// const FsNode = require('fs-node');
var Spotify = require('node-spotify-api');

var moment = require('moment');
moment().format();

var input = process.argv[2]

var artist = process.argv.slice(3).join(" ");

if (input === "concert-this") {
    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (axiosResponse) {
            //Use to look at whole object.
            // console.log(axiosResponse.data);
            for (var i = 0; i < axiosResponse.data.length; i++) {
                var venue = axiosResponse.data[i].venue.name;
                var city = axiosResponse.data[i].venue.city;
                var date = moment(axiosResponse.data[i].datetime).add(1, 'day').format('LLL');
                console.log(artist + " will be playing at " + venue + " in " + city + " on " + date);
            }
        })
}

if (input === "spotify-this-song") {

var spotify = new Spotify(keys.spotify);
var song = process.argv.slice(3).join(" ");

// axios
// .get("https://api.spotify.com/v1/search/q=" + song + "&type=track")
// .then(function (axiosResponse) {
//     //Use to look at whole object.
//     console.log(axiosResponse.data);
// })

spotify
    .search({
        type: 'track',
        query: song,
        limit: 1
    }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
        var artist = data.tracks.items[0].artists[0].name;
        var songName = data.tracks.items[0].name;
        var previewLink = data.tracks.items[0].preview_url;
        var album = data.tracks.items[0].album.name;

        console.log(artist + " sings " + songName);
        console.log("Click for a preview! " + previewLink);
        console.log(songName + "  is on the album " + album);

      });


}

var movie = process.argv.slice(3).join(" ");

if (input === "movie-this") {
    axios
    .get("https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
    .then(function (ombdResponse) {
        console.log("Title: " + ombdResponse.data.Title);
        console.log("Release Year: " + ombdResponse.data.Released);
        console.log("IMDB Rating: " + ombdResponse.data.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + ombdResponse.data.Ratings[1].Value);
        console.log("Country: " + ombdResponse.data.Country);
        console.log("Language: " + ombdResponse.data.Language);
        console.log("Plot: " + ombdResponse.data.Plot);
        console.log("Actors: " + ombdResponse.data.Actors);
    })
    
}
if (input === "do-what-it-says") {

    // var file = new FsNode('random.txt');
}