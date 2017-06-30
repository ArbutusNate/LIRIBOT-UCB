
var fs = require('fs')
var Spotify = require('node-spotify-api')
var request = require('request')
var omdbKey = '40e9cece'
var Twitter = require('twitter')
var twitterAuth = require('./keys.js')
var figlet = require('figlet');
var exec = require('child_process');
var spotify = new Spotify({
  id: 'b4db4aee9894491e84f4b9d01864e058',
  secret: 'fd968ef9491a497d88740b4e8699377b'
})
var client = new Twitter(twitterAuth.twitterKeys)
// var random = require('./random.txt')


// figlet(text, function(err, data) {
//     if (err) {
//         console.log('Something went wrong...');
//         console.dir(err);
//         return;
//     }
//     console.log(data)
// });



var baseCommand = process.argv[2]
var argument1 = process.argv[3]
var importCommand;
var importArguments;

function liri(x, argument1){
  switch(x) {
    case "my-tweets":
        var params = {screen_name: 'ArbutusNate'};
          client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
              var tweetlength = (Object.keys(tweets)).length
              figlet("My Tweets", function(err, data) {
                  if (err) {
                      console.log('Something went wrong...');
                      console.dir(err);
                      return;
                  }
                  console.log('------------------------------------------------')
                  console.log(data)
                  console.log('------------------------------------------------')
                  for (var i = 0; i < tweetlength; i++){
                      console.log('+++++++ ' + i + ' +++++++')
                      console.log(tweets[i].created_at)
                      console.log(tweets[i].text)
                  }
              });
            }
          });
        break
    case "spotify-this-song":
        spotify.search({ type: 'track', query: argument1, limit: 1 }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err)
            }
            var songdata = data.tracks
            figlet("Song Info", function(err, data) {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    return;
                }
                console.log('------------------------------------------------')
                console.log(data)
                console.log('------------------------------------------------')
                console.log('<====> Track Name <====>')
                console.log(songdata.items[0].name)
                console.log('<====>   Artist   <====>')
                console.log(songdata.items[0].artists[0].name)
                console.log('<====>  Preview   <====>')
                console.log(songdata.items[0].preview_url)
                console.log('<====>   Album   <====>')
                console.log(songdata.items[0].album.name)
            })
        })
        break
    case "movie-this":
        request('http://www.omdbapi.com/?apikey=' + omdbKey + '&t=' + argument1, function (error, response, body) {
          // console.log('error:', error);
          var movie = JSON.parse(body)
          // console.log(movie); // Print the whole response
          figlet("Movie Info", function(err, data) {
              if (err) {
                  console.log('Something went wrong...');
                  console.dir(err);
                  return;
              }
              console.log('------------------------------------------------')
              console.log(data)
              console.log('------------------------------------------------')
              console.log('<====>  Title  <====>')
              console.log(movie.Title)
              console.log('<====>  Year   <====>')
              console.log(movie.Year)
              console.log('<==> IMDB Rating <==>')
              console.log(movie.imdbRating)
              console.log('<===> RT Rating <===>')
              console.log(movie.Ratings[1].Value)
              console.log('<===>  Country  <===>')
              console.log(movie.Country)
              console.log('<===>  Language <===>')
              console.log(movie.Language)
              console.log('<====>  Plot   <====>')
              console.log(movie.Plot)
              console.log('<===>   Actors  <===>')
              console.log(movie.Actors)
          });
        })
        break
    case "do-what-it-says":
        console.log('---- do-what-it-says running -----')
        fs.readFile('random.txt', "utf-8", function(err, data){
          var splits = data.split(',')
          importCommand = splits[0]
          importArguments = splits[1]
          console.log(splits[0] + " " + splits[1])
          liri(splits[0], splits[1])
        })
        break
    case "help":
      figlet("Help", function(err, data) {
          if (err) {
              console.log('Something went wrong...');
              console.dir(err);
              return;
          }
          console.log('------------------------------------------------')
          console.log(data)
          console.log('------------------------------------------------')
          console.log("my-tweets                    -- Shows my last 20 tweets.")
          console.log("spotify-this-song <songname> -- Get information about a song.")
          console.log("movie-this <title>           -- Get information about a movie.")
      });
  }
}
liri(baseCommand, argument1)