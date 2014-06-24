/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */


var chats;
var stringifiedChats;
var url = require("url");
var getChats = function(){
  chats = require("chats/chats.js").chats;
  stringifiedChats = JSON.stringify(chats);
  console.log("inside getChats: " + chats.results.length);
};

exports.handleRequest = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode = 200;

  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */
  var headers = defaultCorsHeaders;

  headers["Content-Type"] = "application/json";

  if( request.method === "OPTIONS" ){
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify({}));
  }else if( request.method === "GET" ){
    getChats();
    response.writeHead(statusCode, headers);
    response.write(stringifiedChats);
    response.end();
  }else if( request.method === "POST" ){
    request.on('data', function(chat){
      chat = chat.toString();
      console.log(chat);
      console.log("chats1: " + chats.results[0].text);
      console.log("chats length before: " + chats.results.length);
      chats.addChat(chat);
      console.log("chats length after" + chats.results.length);
    });
    console.log(request.read());
    response.writeHead(statusCode, headers);
    console.log("POSTING UP");
    response.end(JSON.stringify({}));
  }

  response.end(JSON.stringify({}));
};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */

  defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
