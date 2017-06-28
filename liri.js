//Keys
	// OMDB
		// 40e9cece
var Spotify = require('node-spotify-api')
var Request = require('request')
var Twitter = require('twitter')
var twitterKeys = require('./keys')
var spotify = new Spotify({
  id: 'b4db4aee9894491e84f4b9d01864e058',
  secret: 'fd968ef9491a497d88740b4e8699377b'
})
// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
//   console.log('body:', body); // Print the HTML for the Google homepage.
// })

var baseCommand = process.argv[2]
var argument1 = process.argv[3]
var userArgs = process.argv.slice(2)


console.log("This is just [2] " + baseCommand)
console.log("This is sliced input: " + userArgs)

switch(baseCommand){
	case "my-tweets":
		console.log("------ my-tweets running -----")
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
	case "movie-this":
		console.log("---- movie-this running ----")
		break
	case "do-what-it-says":
		console.log('---- do-what-it-says running -----')
		break
	case "info":
		console.log(twitterKeys)
}
