/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */

var results = [];
var objectId = 0;

var url = require('url');

exports.handleRequest = function(request, response) {
  var path = url.parse(request.url, true).path;
  var origin = defaultCorsHeaders["access-control-allow-origin"];

  var statusCode = 0;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";

  console.log(request.method);

  if (request.method === 'OPTIONS') {
    statusCode = 202;

  } else if (request.method === 'POST') {
    statusCode = 201;
    var body = '';

    request.on('data', function(chunk) {
      body += chunk;
    });

    request.on('end', function() {
        var data = JSON.parse(body);
        data['objectId'] = objectId++;
        data['createdAt'] = new Date();
        results.push(data);
    });

  } else if (request.method === 'GET') {
    if(path === origin) {
      var bodyStorage = {};
      bodyStorage.results = results;
      console.log(bodyStorage.results);
      statusCode = 200;
    } else {
      statusCode = 404;
    }
  } else {
    console.log("got through all methods");
    statusCode = 400;
  }

  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(bodyStorage));







  // console.log("Serving request type " + request.method + " for url " + request.url);

  // if (request.method === 'POST') {
  //   var body = '';

  //   request.on('data', function(chunk) {
  //     body += chunk;
  //   });



  //   request.on('end', function() {
  //     try {
  //       var data = JSON.parse(body);
  //       data['objectId'] = objectId++;
  //       data['createdAt'] = new Date();
  //       console.log(data);
  //       results.push(data);
  //       console.log(results);
  //     }
  //   });

  // } else if (request.method === 'GET') {
  //   //response.end(JSON.stringify(bodyStorage));
  //   var bodyStorage = {};
  //   bodyStorage.results = results;
  //   console.log(bodyStorage.results);
  // }

  // var statusCode = 200;


  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */
  // var headers = defaultCorsHeaders;

  // headers['Content-Type'] = "text/plain";

  /* .writeHead() tells our server what HTTP status code to send back */

  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/
};



/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "/classes/messages",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
