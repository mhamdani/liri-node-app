var fs = require("fs");
var keys = require('./keys.js');
var colors = require('colors');

console.log(keys);

// Twitter app
var runTwitter = function() {
  var Twitter = require('twitter');

  var client =  new Twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret,
    });

  var path = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
  var params = 'michelleMUSTudy';

  client.get(path, params, function(error, tweets, response){
    if (error) {
      console.log(error);
    }
    for (var i = 0; i < tweets.length; i++){
      console.log("Tweet: ".rainbow+ tweets[i].text);
      console.log("Post Date: ".red+ tweets[i].created_at);
    }
  });
}

if (process.argv[2] === "my-tweets") {
  runTwitter();
}

// Spotify app
var runSpotify = function() {
  var Spotify = require('spotify');

  spotify.search({ type: 'track', query: process.argv[3] }, function(error, data){
    if (error) {
      console.log("Error: "+ error);
    }
    if (data.tracks.items.length === 0) {
      var path = "https://api.spotify.com/v1/tracks/7GhIk7Il098yCjg4BQjzvb";
      sportify.get(path, function(error, data){
        console.log("Artist: "+ data.artist[0].name);
        console.log("Song name: "+ data.name);
      });
    }
    for (var j = 0; j < data.tracks.items.length; j++){
      var num = j+1;
      console.log("Result #: "+ num);
      console.log("Artist: "+ data.tracks.items[j].artists[0].name
      + "\nTrack: "+ data.tracks.items[j].name
      + "\nAlbum: "+ data.tracks.items[j].album.name
      + "\nLink to song: "+ data.tracks.items[j].href);
    }
  });
};
if (process.argv[2] === "spotify-this-song") {
  runSpotify();
}
