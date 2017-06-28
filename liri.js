
var Spotify = require('node-spotify-api')
var request = require('request')
var omdbKey = '40e9cece'
var Twitter = require('twitter')
var twitterAuth = require('./keys.js')
var spotify = new Spotify({
  id: 'b4db4aee9894491e84f4b9d01864e058',
  secret: 'fd968ef9491a497d88740b4e8699377b'
})
var client = new Twitter(twitterAuth.twitterKeys)


var baseCommand = process.argv[2]
var argument1 = process.argv[3]
var userArgs = process.argv.slice(2)

switch(baseCommand){
    case "my-tweets":
        var params = {screen_name: 'ArbutusNate'};
            client.get('statuses/user_timeline', params, function(error, tweets, response) {
              if (!error) {
                var tweetlength = (Object.keys(tweets)).length
                for (var i = 0; i < tweetlength; i++){
                    console.log(tweets[i].created_at)
                    console.log(tweets[i].text)
                    console.log('--------' + i + '-------')
                }
              }
            });
        break
    case "spotify-this-song":
        spotify.search({ type: 'track', query: argument1, limit: 1 }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err)
            }
        console.log('Track Name: ')
        console.log("++++" + data.tracks.items[0].name)
        console.log('Artist Name: ')
        console.log("++++" + data.tracks.items[0].artists[0].name)
        console.log('Track Preview URL')
        console.log("++++" + data.tracks.items[0].preview_url)
        console.log('Album Name: ')
        console.log("++++" + data.tracks.items[0].album.name)
        })

        break
        break
    case "movie-this":
        console.log("---- movie-this running ----")
        request('http://www.omdbapi.com/?apikey=' + omdbKey + '&t=' + argument1, function (error, response, body) {
          // console.log('error:', error);
          var movie = JSON.parse(body)
          // console.log(movie); // Print the whole response
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
        })
        break
    case "do-what-it-says":
        console.log('---- do-what-it-says running -----')
        break
    case "help":
        console.log()
}
