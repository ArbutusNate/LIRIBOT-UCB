// Requirements
  var fs = require("fs");
  var Spotify = require("node-spotify-api");
  var request = require("request");
  var Twitter = require("twitter");
  var twitterAuth = require("./keys.js");
  var figlet = require("figlet"); // For ASCII art
  var chalk = require("chalk"); // For Fancy Colors
  var spotify = new Spotify({
    id: "b4db4aee9894491e84f4b9d01864e058",
    secret: "fd968ef9491a497d88740b4e8699377b"
  });
  var client = new Twitter(twitterAuth.twitterKeys);

// Chalk Colors
  var header = chalk.blue;
  var seperator = chalk.yellow;

// User Input
  var baseCommand = process.argv[2];
  var argument1 = process.argv[3];
  var totalCommand = process.argv;

function liri(x, argument1){
  switch(x) {
    case "my-tweets":
      var params = {screen_name: "ArbutusNate"};
      client.get("statuses/user_timeline", params, function(error, tweets, response) {
        if (!error) {
          var tweetlength = (Object.keys(tweets)).length;
          custfig("My Tweets", function(){
            for (var i = 0; i < tweetlength; i++){
              console.log("+++++++ " + i + " +++++++");
              console.log(tweets[i].created_at);
              console.log(tweets[i].text);
            }
          });
        }
      });
      break;
    case "spotify-this-song":
      spotify.search({ type: "track", query: argument1, limit: 1 }, function(err, data) {
        if (err) {
          return console.log("Error occurred: " + err);
        }
        var songdata = data.tracks;
        custfig("Song Info", function(){
            console.log("<====> Track Name <====>");
            console.log(songdata.items[0].name);
            console.log("<====>   Artist   <====>");
            console.log(songdata.items[0].artists[0].name);
            console.log("<====>  Preview   <====>");
            console.log(songdata.items[0].preview_url);
            console.log("<====>   Album   <====>");
            console.log(songdata.items[0].album.name);
        });
      });
      break;
    case "movie-this":
      var omdbURL = "http://www.omdbapi.com/?apikey=40e9cece&t=";
      for(var i = 3; i < totalCommand.length; i++){
        if(i === 3){
          omdbURL = omdbURL + (process.argv[i]);
        } else {
          omdbURL = omdbURL + ("+" + process.argv[i]);
        }
      }
      request(omdbURL, function (error, response, body) {
        var movie = JSON.parse(body);
        custfig("Movies!", function(){
          console.log("<====>  Title  <====>");
          console.log(movie.Title);
          console.log("<====>  Year   <====>");
          console.log(movie.Year);
          console.log("<==> IMDB Rating <==>");
          console.log(movie.imdbRating);
          console.log("<===> RT Rating <===>");
          console.log(movie.Ratings[1].Value);
          console.log("<===>  Country  <===>");
          console.log(movie.Country);
          console.log("<===>  Language <===>");
          console.log(movie.Language);
          console.log("<====>  Plot   <====>");
          console.log(movie.Plot);
          console.log("<===>   Actors  <===>");
          console.log(movie.Actors);
        });
      });
      break;
    case "do-what-it-says":
      fs.readFile("random.txt", "utf-8", function(err, data){
        var splits = data.split(",");
        console.log(splits[0] + " " + splits[1]);
        liri(splits[0], splits[1]);
      });
      break;
    case "help":
      custfig("Help", function(){
        console.log("my-tweets                    -- Shows my last 20 tweets.");
        console.log("spotify-this-song <songname> -- Get information about a song.");
        console.log("movie-this <title>           -- Get information about a movie.");
      });
  }
}
function custfig (y, callback){
  figlet(y, function(err, data) {
    if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
    } else {
        console.log(seperator("------------------------------------------------"));
        console.log(header(data));
        console.log(seperator("------------------------------------------------"));
        callback();
    }
  });
}
liri(baseCommand, argument1);