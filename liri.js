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

if (song === ""){
    song = "The Sign by Ace of Base";
}

spotify
    .search({
        type: 'track',
        query: song,
        limit: 10
    }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
        const tracks= data.tracks.items;

        for(let i = 0; i < tracks.length; i++){
            const artistName = tracks[i].album.artists[0].name;
            const songName = tracks[i].name;
            const previewLink = tracks[i].preview_url; 
            const album = tracks[i].album.name;
            console.log("---------------");
            console.log(artistName + " -- " + songName);
            console.log("Listen Here! - " + previewLink);
            console.log("Album: " + album);
        }
        

      });


}

if (input === "movie-this") {
var movie = process.argv.slice(3).join(" ");
    axios
    .get("https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
    .then(function (ombdResponse) {
        console.log("Title of Movie: " + ombdResponse.data.Title);
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