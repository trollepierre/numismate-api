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
        method: 'POST',
        path: '/api/users',
        handler: handlers.addCountry
    },
    {
        method: 'GET',
        path: '/api/users/{username}',
        handler: handlers.getUser
    },
    {
        method: 'GET',
        path: '/api/users/{username}/coins',
        handler: handlers.getCoins
    }
];