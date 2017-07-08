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

// Main Function
  function liri(x, argument1){
    switch(x) {
      case "my-tweets":
        var params = {screen_name: "ArbutusNate"};
        client.get("statuses/user_timeline", params, function(error, tweets, response) {
          if (!error) {
            var tweetlength = (Object.keys(tweets)).length;
            custfig("My Tweets", function(){
              for (var i = 0; i < tweetlength; i++){
                loglog("+++++++ " + i + " +++++++");
                loglog(tweets[i].created_at);
                loglog(tweets[i].text);
              }
            });
          }
        });
        break;
      case "spotify-this-song":
        if(argument1 != undefined){
          songsearch(argument1)
        } else {
          songsearch("The Sign Ace")
        }
        break;
      case "movie-this":
        var omdbURL = "http://www.omdbapi.com/?apikey=40e9cece&t=";
        for(var i = 3; i < totalCommand.length; i++){
          if(i === 3){
            omdbURL = omdbURL + (process.argv[i]);
          } else {
            omdbURL = omdbURL + ("+" + process.argv[i]);
          }
        };
        if(argument1 != undefined){
          moviesearch(omdbURL);
        } else {
          moviesearch((omdbURL + "Mr. Nobody"));
        };
        break;
      case "do-what-it-says":
        fs.readFile("random.txt", "utf-8", function(err, data){
          var splits = data.split(",");
          liri(splits[0], splits[1]);
        });
        break;
      case "clear-log":
        fs.writeFile("./log.txt", " ", "utf-8");
        console.log("Log Cleared");
        break;
      case "help":
        custfig("Help", function(){
          loglog("my-tweets                    -- Shows my last 20 tweets.");
          loglog("spotify-this-song <songname> -- Get information about a song.");
          loglog("movie-this <title>           -- Get information about a movie.");
          loglog("clear-log                    -- Clear log.txt")
        });
    }
  }

// Function
  function loglog (loggedText){
    console.log(loggedText);
      fs.appendFile("./log.txt", (loggedText + '\r\n'), "utf-8");
  }

  function songsearch (arg1){
    spotify.search({ type: "track", query: arg1, limit: 1 }, function(err, data) {
      if (err) {
        return loglog("Error occurred: " + err);
      }
      var songdata = data.tracks.items[0];
      custfig("Song Info", function(){
          loglog("<====> Track Name <====>");
          loglog(songdata.name);
          loglog("<====>   Artist   <====>");
          loglog(songdata.artists[0].name);
          loglog("<====>  Preview   <====>");
          loglog(songdata.preview_url);
          loglog("<====>   Album   <====>");
          loglog(songdata.album.name);
      });
    });
  }

  function moviesearch (input){
    request(input, function (error, response, body) {
      var movie = JSON.parse(body);
      custfig("Movies!", function(){
        loglog("<====>  Title  <====>");
        loglog(movie.Title);
        loglog("<====>  Year   <====>");
        loglog(movie.Year);
        loglog("<==> IMDB Rating <==>");
        loglog(movie.imdbRating);
        loglog("<===> RT Rating <===>");
        loglog(movie.Ratings[1].Value);
        loglog("<===>  Country  <===>");
        loglog(movie.Country);
        loglog("<===>  Language <===>");
        loglog(movie.Language);
        loglog("<====>  Plot   <====>");
        loglog(movie.Plot);
        loglog("<===>   Actors  <===>");
        loglog(movie.Actors);
      });
    });
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