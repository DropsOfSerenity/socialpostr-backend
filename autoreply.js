/* globals config, Post */
(function() {
  'use strict';

  var sails = require('sails');
  var Twit = require('twit');
  var ObjectID = require('mongodb').ObjectID;

  var twitterDirectMessageAPI = 'https://api.twitter.com/1.1/direct_messages/new.json';

  sails.load(function() {
    autoreplyUsers();
  });

  function autoreplyUsers() {
    User.find().where({
      twitterAutoReplyEnabled: true
    }).exec(function (err, users) {
      users.forEach(function(user) {
        subscribeToStream(user);
      });
    });
  }

  function subscribeToStream(user) {
    var T = new Twit({
      consumer_key: config.TWITTER_KEY,
      consumer_secret: config.TWITTER_SECRET,
      access_token: user.twitterToken,
      access_token_secret: user.twitterSecret
    });
    var stream = T.stream('user');
    stream.on('follow', function (eventMsg) {
      // update the user instance
      User.findOne(user.id).exec(function (err, updatedUser) {
        sendDirectMessage(T, eventMsg.source.screen_name, updatedUser.twitterAutoReplyMessage);
      });
    });
  }

  function sendDirectMessage(T, screenName, text) {
    T.post('direct_messages/new', {
      screen_name: screenName,
      text: text
    }, function(err, data, response) {
      if (err) {
        console.log(err);
      } else {
        console.log('sent message to', screenName);
      }
    });
  }
}());
