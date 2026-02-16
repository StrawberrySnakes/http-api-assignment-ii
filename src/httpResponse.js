const query = require('querystring');

// In-memory database
const users = {};

// json helper
const respondJSON = (request, response, status, object) => {
  const responseJSON = JSON.stringify(object);

  response.writeHead(status, {
    'Content-Type': 'application/json',
  });

  // TODO:
  // Only send body if NOT HEAD request

  response.end();
};

// Get Users
const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  // TODO:
  // Send 200 response
};

// Add users functions
const addUser = (request, response) => {
  const body = [];

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);

    // TODO:
    // If name OR age missing → 400
    // If new user → 201
    // If existing user → 204
  });
};

// 404
const notFound = (request, response) => {
  const message = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // TODO:
  // Send 404
};

module.exports = {
  getUsers,
  addUser,
  notFound,
};
