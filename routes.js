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
        path: '/users/fr/1c',
        handler: handlers.getPierreTrolleFr1c
    },
    {
        method: 'POST',
        path: '/api/users',
        handler: handlers.addCountry
    }
]