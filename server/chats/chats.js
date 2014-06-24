
exports.chats = chats = {
  results: [{
    roomname: 'the one and only',
    objectId: 1,
    text: 'Okay I think this is working now',
    username: 'Joshua'
  }],

  addChat: function(newChat){
    this.results.push(newChat);
  },

  getChats: function(){
    return this.results;
  }
};
