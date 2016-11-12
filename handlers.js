const pierretrolle = require('./data/data_users')

module.exports = {
    helloWorld (request, reply) {
        reply('Hello Numismate world!');
    },

    getUsers(request, reply) {
        const data = require("./data/data_users.json");
        if (request.query && request.query.fields === 'country') {
            return reply(data.map(pseudo => {
                    return {
                        country: pseudo.country
                    }
                }))
        }
        reply(data);
    },

    getPierreTrolle(request, reply) {
        const data = require("./data/data_pierretrolle.json");
        if (request.query && request.query.fields === 'country') {
            return reply(data.map(pseudo => {
                    return {
                        country: pseudo.country
                    }
                }))
        }
        reply(data);
    },

    getPierreTrolleFr1c(request, reply) {
        const data = require("./data/data_fr_1c.json");
        if (request.query && request.query.fields === 'name') {
            return reply(data.map(pokemon => {
                    return {
                        name: pokemon.name
                    }
                }))
        }
        reply(data);
    },

    addCountry(request, reply) {
        if (!request.payload) {
            return reply().code(400)
        }
        pierretrolle.push(request.payload)
        reply().code(201);
    },
}