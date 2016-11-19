var Joi = require('joi');

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
        config: {
            handler: handlers.addCountry
            // validate: {payload: Joi.string().required()}
        }
    },
    {
        method: 'GET',
        path: '/api/users/{username}',
        config: {
            handler: handlers.getUser,
            validate: {query: {name: Joi.string().min(3).max(20)}}
        }
    },
    {
        method: 'GET',
        path: '/api/users/{username}/coins',
        config: {
            handler: handlers.getCoins,
            validate: {query: {name: Joi.string().min(3).max(20)}}
        }
    }
];