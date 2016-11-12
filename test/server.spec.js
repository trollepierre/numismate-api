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
                server.inject('/api/users?fields=username', (res) => {
                    const users = require('../data/data_users');
                    expect(res.result).to.eql(users.map(user => {
                            return {
                                username: user.username
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
                server.inject({ method: 'post', url: '/api/users', payload: { username: "ASA", id:"7" }}, (res) => {
                    expect(res.statusCode).to.equal(201);
                    done();
                });
            });
            it('should add a new user to the list', (done) => {
                server.inject({ method: 'post', url: '/api/users', payload: { username: "ASA", id:"7" }}, (res) => {
                    server.inject('/api/users', (res) => {
                        const adrien_name = res.result.find(user => user.username === 'ASA')
                        expect(adrien_name).to.exist
                        done();
                    });
                });
            });
            it('should add a new coin into the country/value/year', (done) => {
                server.inject({
                    method: 'post',
                    url: '/api/users',
                    payload: {
                        username: 'ASA',
                        id: '1'
                    }
                }, (res) => {
                    server.inject('/api/users', (res) => {
                        const adrien_id = res.result.find(user => user.id === '1')
                        expect(adrien_id).to.exist
                        done();
                    });
                });
            });
        });
    });

    describe('GET /api/users/ASA', () => {
        it('should return a 200', (done) => {
            server.inject('/api/users/ASA', (res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
        });

        it('should return an array', (done) => {
           server.inject('/api/users/ASA', (res) => {
             expect(res.result).to.be.an('array');
             done();
           });
         });

        it('should return users with username = PTR', (done) => {
            server.inject('/api/users/PTR', (res) => {
                const users = [{
                    username: 'PTR', id: '3'
                }]
                expect(res.result).to.eql(users)
                done();
            });
        });
    });
});