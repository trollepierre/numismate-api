const handlers = require('./handlers');

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: handlers.helloWorld
    },
    {
        method: 'GET',
        path: '/pierretrolle',
        handler: handlers.getPierreTrolle
    },
    {
        method: 'GET',
        path: '/pierretrolle/fr/1c',
        handler: handlers.getPierreTrolleFr1c
    },
    {
        method: 'POST',
        path: '/pierretrolle',
        handler: handlers.addCountry
    }
]