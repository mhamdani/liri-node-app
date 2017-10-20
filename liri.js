var fs = require("fs");
var keys = require('./keys.js');

console.log(keys);

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
      console.log(tweets[i].text);
    }
  });
}

if (process.argv[2] === "my-tweets") {
  runTwitter();
}
