//Keys
	// Spotify
		// Client ID = b4db4aee9894491e84f4b9d01864e058
		// Client Secret= fd968ef9491a497d88740b4e8699377b
	// OMDB
		// 40e9cece
var Spotify = require('node-spotify-api')
var Request = require('request')
var Twitter = require('twitter')
var twitterKeys = require('./keys')

var test = process.argv[2]

console.log(test)