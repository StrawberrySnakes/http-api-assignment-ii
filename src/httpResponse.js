//httpResponses.js
const query = require('querystring');

// In-memory database
const users = {};

// json helper
const respondJSON = (request, response, status, object) => {
  const responseJSON = JSON.stringify(object);
  response.writeHead(status, {
    'Content-Type': 'application/json',
  });

  if( request.method!= 'HEAD' ) {
    response.write(responseJSON);
  }
  response.end();
};

// Get Users
const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  return respondJSON(request, response, 200, responseJSON);
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

    if(!bodyParams.name || !bodyParams.age) {
        const message = {
            message: "Name and Age are needed",
            id : "missingParams"
        };
        return respondJSON(request, response, 400, message);
    }

    let statusCode = 201;
    if(users[bodyParams.name]) {
        statusCode = 204;
    }

    users[bodyParams.name] = {
        name: bodyParams.name,
        age: bodyParams.age
    }

    if(statusCode == 201) {
        const message = {
            message: 'User created successfully'
        }
        return respondJSON(request, response, 201, message);
    }

    //if updating --> 204
    response.writeHead(204);
    return response.end();
  });
};

// 404
const notFound = (request, response) => {
  const message = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, message);
};

module.exports = {
  getUsers,
  addUser,
  notFound,
};
