import { readFile } from "node:fs/promises";
import http from "node:http";

function sendHTML(response, html) {
  response.writeHead(200, {
    "Content-Type": "text/html",
  });
  // just attaching the CSS wont let the frontend access it we need to handle that case as well.
  // when CSS file mentioned in the header then it will make a request for /styles.css
  response.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Devlogs</title>

        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        ${html}
      </body>
    </html>
    `);
}
const server = http.createServer(async (request, response) => {
  console.log("REQUEST", request.url, request.method, request.headers);

  if (request.method === "GET" && request.url === "/styles.css") {
    const css = await readFile("./src/styles.css", "utf8");
    response.writeHead(200, {
      "Content-Type": "text/css",
    });

    response.end(css);

    return;
  }

  if (request.method === "GET" && request.url === "/") {
    return sendHTML(
      response,
      `
      <h1>Home</h1>
      <a href="/devlogs">View Devlogs</a>
    `,
    );
  }

  if (request.method === "GET" && request.url === "/devlogs") {
    return sendHTML(
      response,
      `
      <h1>Devlogs</h1>
      <article>
        <h2>Understanding Browser Rendering</h2>
        <a href="/devlogs/browser-rendering">
          Read devlog
        </a>
      </article>`,
    );
  }

  if (
    request.method === "GET" &&
    request.url === "/devlogs/browser-rendering"
  ) {
    return sendHTML(
      response,
      `
      <h1>Understanding Browser Rendering</h1>

      <p>
        This is my first devlog.
      </p>

      <a href="/devlogs">Back to devlogs</a>
    `,
    );
  }

  response.writeHead(404, {
    "content-type": "text/plain",
  });

  response.end("Not Found");
});

const serverPort = 3000;
server.listen(serverPort, () => {
  console.log(`Server running is running at ${serverPort}`);
});
