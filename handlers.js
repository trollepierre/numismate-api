const pokemons = require('./data/data')

module.exports = {
    helloWorld (request, reply) {
        reply('Hello Numismate world!');
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

    getAllPokemons(request, reply) {
        const data = require("./data/data.json");
            if (request.query && request.query.fields === 'name') {
                  return reply(data.map(pokemon => {
                        return {
                          name: pokemon.name
                    }
                  }))
                }
        reply(data);
    },

    addPokemon(request, reply) {
        if (!request.payload) {
            return reply().code(400)
        }
        pokemons.push(request.payload)
        reply().code(201);
    },

    getDays(request, reply) {
        reply([]);
    }
}