const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const responses = require('./httpResponse.js');

const port = 3000;

// handler function
const handleRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const pathname = parsedUrl.pathname;

  // Get or head
  if (request.method === 'GET' || request.method === 'HEAD') {

    if (pathname === '/') {
      const html = fs.readFileSync(path.join(__dirname, '../client.html'));
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(html);
      return response.end();
    }

    if (pathname === '/style.css') {
      const css = fs.readFileSync(path.join(__dirname, '../style.css'));
      response.writeHead(200, { 'Content-Type': 'text/css' });
      response.write(css);
      return response.end();
    }

    if (pathname === '/getUsers') {
      return responses.getUsers(request, response);
    }

    if (pathname === '/notReal') {
      return responses.notFound(request, response);
    }

    return responses.notFound(request, response);
  }

  // post request handler
  if (request.method === 'POST') {
    if (pathname === '/addUser') {
      return responses.addUser(request, response);
    }
  }

  return responses.notFound(request, response);
};

// Start server
http.createServer(handleRequest).listen(port);

console.log(`Listening on port ${port}`);
