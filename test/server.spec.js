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

    describe('GET /api/users', () => {
        it('should return a 200', (done) => {
            server.inject('/api/users', (res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
        });

        it('should return an array', (done) => {
            server.inject('/api/users', (res) => {
                expect(res.result).to.be.an('array');
                done();
            });
        });

        it('should return the collection of users', (done) => {
            server.inject('/api/users', (res) => {
                expect(res.result).to.deep.equal(require('../data/data_users'));
                done();
            });
        });

        describe('when I provide a list of fields', () => {
            it('should return the appropriate fields', (done) => {
                server.inject('/api/users?fields=country', (res) => {
                    const users = require('../data/data_users');
                    expect(res.result).to.eql(users.map(pseudo => {
                            return {
                                country: pseudo.country
                            }
                        }));
                    done();
                });
            });
        });
    });

    describe('POST /api/users', () => {
        describe('when there is no payload', () => {
            it('should return 400', (done) => {
                server.inject({ method: 'post', url: '/api/users'}, (res) => {
                expect(res.statusCode).to.equal(400);
                done();
                });
            });
        });
        describe('when there is a payload', () => {
            it('should return 201', (done) => {
                server.inject({ method: 'post', url: '/api/users', payload: { country: 'Foobar'}}, (res) => {
                    expect(res.statusCode).to.equal(201);
                    done();
                });
            });
            it('should add a new country to the list', (done) => {
                server.inject({ method: 'post', url: '/api/users', payload: { country: 'Foobar'}}, (res) => {
                    server.inject('/api/users', (res) => {
                        const foobar = res.result.find(pseudo => pseudo.country === 'Foobar')
                        expect(foobar).to.exist
                        done();
                    });
                });
            });
            it('should add a new coin into the country/value/year', (done) => {
                server.inject({
                    method: 'post',
                    url: '/api/users',
                    payload: {
                        country: 'Foobar',
                        value: 'c1',
                        year: '1999',
                        quantity: '8'
                    }
                }, (res) => {
                    server.inject('/api/users', (res) => {
                        const c1 = res.result.find(pseudo => pseudo.value === 'c1')
                        expect(c1).to.exist
                        const year = res.result.find(pseudo => pseudo.year === '1999')
                        expect(year).to.exist
                        const quantity = res.result.find(pseudo => pseudo.quantity === '8')
                        expect(quantity).to.exist
                        done();
                    });
                });
            });
        });
    });

    describe('GET /users/fr/1c', () => {
        it('should return a 200', (done) => {
            server.inject('/users/fr/1c', (res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
        });

        it('should return an array', (done) => {
           server.inject('/users/fr/1c', (res) => {
             expect(res.result).to.be.an('array');
             done();
           });
         });

        it('should return 1 coin in 1991', (done) => {
            server.inject('/users/fr/1c', (res) => {
            expect(res.result).to.deep.equal(require('../data/data_fr_1c'));
                done();
            });
        });
    });
});