const handlers = require('./handlers');

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: handlers.helloWorld
    },
    {
        method: 'GET',
        path: '/api/users',
        handler: handlers.getUsers
    },
    {
        method: 'GET',
        path: '/api/users/{username}',
        handler: handlers.getUser
    },
    {
        method: 'POST',
        path: '/api/users',
        handler: handlers.addCountry
    }
];