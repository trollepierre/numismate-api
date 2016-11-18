const users = require('./data/data_users')

module.exports = {
    helloWorld (request, reply) {
        reply('Hello Numismate world!');
    },

    getUsers(request, reply) {
        const data = require("./data/data_users.json");
        if (request.query && request.query.fields === 'username') {
            return reply(data.map(user => {
                return {
                    username: user.username
                }
            }));
        }
        reply(data);
    },

    addCountry(request, reply) {
        if (!request.payload) {
            return reply().code(400);
        }
        users.push(request.payload);
        reply().code(201);
    },

    getUser(request, reply) {
        const data = require("./data/data_users.json");
        if (request.params && request.params.username) {
            return reply(data
                .filter(function (user) {
                    return (user.username === request.params.username);
                })
                .map(user => {
                    return {
                        username: user.username,
                        id: user.id
                    }
                })
            );
        }
        reply(data);
    },

    getCoins(request, reply) {
        const data = require("./data/data_users.json");
        if (request.params && request.params.username) {
            const coins = data
                .filter(function (user) {
                    return (user.username === request.params.username);
                })
                .filter(function (user) {
                    return (user.coins);
                })
                .map(user => user.coins);
            return reply(coins);
        }
        reply(data);
    },

};