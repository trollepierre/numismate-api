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

        it('should return an array', (done) => {
            server.inject('/pierretrolle', (res) => {
                expect(res.result).to.be.an('array');
                done();
            });
        });

        it('should return the collection of pierretrolle', (done) => {
            server.inject('/pierretrolle', (res) => {
                expect(res.result).to.deep.equal(require('../data/data_pierretrolle'));
                done();
            });
        });

        describe('when I provide a list of fields', () => {
            it('should return the appropriate fields', (done) => {
                server.inject('/pierretrolle?fields=country', (res) => {
                    const pierretrolle = require('../data/data_pierretrolle');
                    expect(res.result).to.eql(pierretrolle.map(pseudo => {
                            return {
                                country: pseudo.country
                            }
                        }));
                    done();
                });
            });
        });
    });

    describe('POST /pierretrolle', () => {
        describe('when there is no payload', () => {
            it('should return 400', (done) => {
                server.inject({ method: 'post', url: '/pierretrolle'}, (res) => {
                expect(res.statusCode).to.equal(400);
                done();
                });
            });
        });
        describe('when there is a payload', () => {
            it('should return 201', (done) => {
                server.inject({ method: 'post', url: '/pierretrolle', payload: { country: 'Foobar'}}, (res) => {
                    expect(res.statusCode).to.equal(201);
                    done();
                });
            });
            it('should add a new country to the list', (done) => {
                server.inject({ method: 'post', url: '/pierretrolle', payload: { country: 'Foobar'}}, (res) => {
                    server.inject('/pierretrolle', (res) => {
                        const foobar = res.result.find(pseudo => pseudo.country === 'Foobar')
                        expect(foobar).to.exist
                        done();
                    });
                });
            });
            it('should add a new coin into the country/value/year', (done) => {
                server.inject({
                    method: 'post',
                    url: '/pierretrolle',
                    payload: {
                        country: 'Foobar',
                        value: 'c1',
                        year: '1999',
                        quantity: '8'
                    }
                }, (res) => {
                    server.inject('/pierretrolle', (res) => {
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
    });
});