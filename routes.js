const handlers = require('./handlers');

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: handlers.helloWorld
    },
    {
        method: 'GET',
        path: '/api/pierretrolle',
        handler: handlers.getPierreTrolle
    },
    {
        method: 'GET',
        path: '/pierretrolle/fr/1c',
        handler: handlers.getPierreTrolleFr1c
    },
    {
        method: 'POST',
        path: '/api/pierretrolle',
        handler: handlers.addCountry
    }
]