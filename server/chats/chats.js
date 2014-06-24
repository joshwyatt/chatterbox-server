// var requestHandle = require("request-handler.js");
// var server = require("basic-server.js").server;

exports.chats = {
  results: [{
    roomname: 'the one and only',
    objectId: 1,
    text: 'Okay I think this is working now',
    username: 'Joshua'
  }],

  addChat: function(newChat){
    this.results.push(newChat);
  }
};
