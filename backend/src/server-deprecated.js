import http from "node:http";
// request and response are arguments passed by Node.js to your callback function.
// Every time a browser makes a request, this function executes:
const server = http.createServer((request, response) => {
  /**
   * Node's request object has references to other objects such as the underlying TCP socket, the server, and the response.
   * Those objects themselves contain references back to other objects. That's why console.log(request) produces a massive dump with things like:
   */
  console.log("REQUEST", request.url, request.method, request.headers);
  // response is what you use to construct the HTTP response:
  if (request.method === "GET" && request.url === "/") {
    response.writeHead(200, {
      "content-type": "text/html",
    });
    // this end tells "I am done producing the HTTP response. Send this data as the response body and finish the response"
    response.end(`
    <!DOCTYPE html>
      <html>
        <head>
          <title>Devlogs</title>
        </head>
        <body>
          <h1>Devlogs</h1>
          <p>My engineering notes.</p>
        </body>
      </html>
    `);
    return;
  }

  response.writeHead(404, {
    "content-type": "text/plain",
  });

  response.end("Not Found");
});

const serverPort = 3000;
// keeps the Node process alive by opening a network server.
server.listen(serverPort, () => {
  console.log(`Server running is running at ${serverPort}`);
});
