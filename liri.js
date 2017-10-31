var fs = require("fs");
var keys = require('./keys.js');
var colors = require('colors');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

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
getMeSpotify = function(songName) {
  var spotifyApi = new SpotifyWebApi({
    clientId : 'fcecfc72172e4cd267473117a17cbd4d',
    clientSecret : 'a6338157c9bb5ac9c71924cb2940e1a7',
    redirectUri : 'http://www.example.com/callback'
  });

  if (songName === undefined) {
    songName == "hello";
  }
  spotify.search(
    {
      type: "track",
      query: songName
    },
    function(err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }
      var songs = data.tracks.items;
      for (var i = 0; i < songs.length; i++) {
        console.log(i);
        console.log("artist(s): " + songs[i].artists.map(getArtistNames));
        console.log("song name: " + songs[i].name);
        console.log("preview song: " + songs[i].preview_url);
        console.log("album: " + songs[i].album.name);
        console.log("-----------------------------------");
      }
    }
  );

  if (process.argv[2] === "spotify-this-song") {
    console.log("Finding your song..".magenta);
    getMeSpotify();
};
};
