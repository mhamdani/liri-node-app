var fs = require("fs");
var keys = require('./keys.js');
var colors = require('colors');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api')

// Writes to the log.txt file
var logData = function(data) {
  fs.appendFile("log.txt", data, function(err){
    if (err) {
      console.log('error loggin text: '+ err);
    }
    console.log("User's search was updated in log.txt".magenta);
  });
};


// Twitter app; 'my-twitter'
var runTwitter = function() {
  logData("\n\n=======================\nUser searched for tweets on Twitter\n\n");

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

// Spotify app; 'spotify-this-song'
var runSpotify = function() {
  var spotify = new Spotify({
    id : 'dbcd9d5ec0e04e6ba6843afca51463bb',
    secret : 'c12a2fb0c2f042b3bf7c5a3c57de50de',
  });

  if (process.argv[3] === undefined) {
      process.argv[3] = "I Want it That Way";
  }
  spotify.search(
    {
      type: "track",
      query: process.argv[3]
    },
    function(err, data) {
      logData("\n\n=======================\nUser searched for this track on Spotify: "+ process.argv[3] + "\n\n");
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
  logData();
}

// OMDB API; 'movie-this'
var runGetMovie = function() {
  if (process.argv[3] === undefined) {
    process.argv[3] = "Mr Nobody";
  }
  var query = process.argv[3];
  var search = "http://www.omdbapi.com/?t=" + query + "&y=&plot=full&tomatoes=true&apikey=40e9cece";

  request.get(search, function(error, data, body){

    jsonBody = JSON.parse(body);
    logData("\n\n=======================\nUser searched for the movie:\n" + jsonBody.Title + "\n\nReleased:\n" + jsonBody.Year);
    // console.log(body);

    if (jsonBody.Error){
      console.log("Error :" + error);
    } else {
      console.log('\n\nMovie Title: '.cyan + jsonBody.Title);
      console.log('Year released: '.cyan + jsonBody.Year);
      console.log('IMDB rating: '.cyan + jsonBody.imdbRating);
      console.log("Rotten Tomatoes rating: ".cyan + jsonBody.Rated);
      console.log("Country: ".cyan + jsonBody.Country);
      console.log("Language: ".cyan + jsonBody.Language);
      console.log('Actors: '.cyan + jsonBody.Actors);
      console.log('\n\nMovie synopsis: '.cyan + jsonBody.Plot);
      console.log('\n\n');
    }
  });
};

if (process.argv[2]==="movie-this"){
  runGetMovie();
}
