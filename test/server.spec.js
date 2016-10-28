const chai = require('chai');
const expect = chai.expect;
const server = require('../server');
chai.config.truncateThreshold = 0;


describe('Server', () => {
    describe('GET /',() => {
        it('should return the appropriate string', (done) => {
            server.inject('/', (res) => {
            expect(res.result).to.equal('Hello Numismate world!');
            done();
            });
        });
    });

    describe('GET /pierretrolle', () => {
        it('should return a 200', (done) => {
            server.inject('/pierretrolle', (res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
        });
    });

    describe('GET /pierretrolle/fr/1c', () => {
        it('should return a 200', (done) => {
            server.inject('/pierretrolle/fr/1c', (res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
        });

        it('should return an array', (done) => {
           server.inject('/pierretrolle/fr/1c', (res) => {
             expect(res.result).to.be.an('array');
             done();
           });
         });


        it('should return 1 coin in 1991', (done) => {
            server.inject('/pierretrolle/fr/1c', (res) => {
            expect(res.result).to.deep.equal(require('../data/data_fr_1c'));
                done();
            });
        });

        describe('when I provide a list of fields', () => {
          it('should return the appropriate fields', (done) => {
          server.inject('/pokemons?fields=name', (res) => {
              const pokemons = require('../data/data');
          expect(res.result).to.eql(pokemons.map(pokemon => {
                  return {
                      name: pokemon.name
                  }
              }));
          done();
            });
          });
        });
    });

    describe('POST /pokemons', () => {
        describe('when there is no payload', () => {
          it('should return 400', (done) => {
            server.inject({ method: 'post', url: '/pokemons'}, (res) => {
              expect(res.statusCode).to.equal(400);
              done();
            });
          });
        });
        describe('when there is a payload', () => {
          it('should return 201', (done) => {
            server.inject({ method: 'post', url: '/pokemons', payload: { name: 'Foobar'}}, (res) => {
              expect(res.statusCode).to.equal(201);
              done();
            });
          });
          it('should add a new pokemon to the list', (done) => {
            server.inject({ method: 'post', url: '/pokemons', payload: { name: 'Foobar'}}, (res) => {
              server.inject('/pokemons', (res) => {
                const foobar = res.result.find(pokemon => pokemon.name === 'Foobar')
                expect(foobar).to.exist
                done();
              });
            });
          });
        });
      });

    describe('GET /days', () => {
        it('should return a 200', (done) => {
        server.inject('/days', (res) => {
            expect(res.statusCode).to.equal(200);
            done();
            });
        });

        it('should return a list of days', (done) => {
            server.inject('/days', (res) => {
            expect(res.result).to.deep.equal([]);
            done();
            });
        });
    });
});