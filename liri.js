var fs = require("fs");
var keys = require('./keys.js');
var colors = require('colors');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api')

// var Spotify = ({
//   clientId : 'fcecfc72172e4cd267473117a17cbd4d',
//   clientSecret : 'a6338157c9bb5ac9c71924cb2940e1a7',
//   redirectUri : 'http://www.example.com/callback'
// });

// console.log(keys);

// Twitter app
var runTwitter = function() {

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
};

// Spotify app
// Function for running a Spotify search
var runSpotify = function() {
  var spotify = new Spotify({
    id : 'dbcd9d5ec0e04e6ba6843afca51463bb',
    secret : 'c12a2fb0c2f042b3bf7c5a3c57de50de',
  });

  spotify.search(
    {
      type: "track",
      query: process.argv[3]
    },
    function(err, data) {
      if (err) {
        console.log("Error: " + err);
        return;
      }
      if (data.tracks.items.length === 0) {
        var path = "https://api.spotify.com/v1/tracks/7GhIk7Il098yCjg4BQjzvb";
        spotify.get(path, function(error, data) {
        console.log("-----------------------------------");
    });
  }
  var getArtistNames = function(artist) {
    return artist.name;
  };
  var songs = data.tracks.items;
  console.log('Top 5 Spotify songs that match your inquiry: \n'.green);
  for (var j = 0; j < 5; j++) {
    var count = j + 1;
    console.log('Track title: '.magenta+ songs[j].name);
    console.log('Artist: '.magenta+ songs[j].artists.map(getArtistNames));
    console.log('Album: '.magenta+songs[j].album.name);
    console.log('\n\n');
  }
});
};

if (process.argv[2] === "spotify-this-song") {
  runSpotify();
}
