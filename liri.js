require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);

var input = process.argv[2]

var artist = process.argv.slice(3).join(" ");

if (input === "concert-this") {
    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (axiosResponse) {
            console.log(axiosResponse.data);
            for (var i = 0; i < axiosResponse.data.length; i++) {
                console.log(axiosResponse.data[i].venue.name);
                console.log(axiosResponse.data[i].venue.city);
                console.log(axiosResponse.data[i].datetime);
            }
        })
}
if (input === "spotify-this-song") {

}
if (input === "movie-this") {

}
if (input === "do-what-it-says") {

}