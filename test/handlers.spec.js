const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const handlers = require('../handlers');
chai.use(require('sinon-chai'));

describe('Handlers', () => {

   describe('.getUsers()', () => {
        it('should get Users!', () => {
            // Given
            const mySpy = sinon.spy();

            // When
            handlers.getUsers({}, mySpy);

            // Then
            expect(mySpy).to.have.been.calledWith(require('../data/data_users.json'));
        });

        describe('when request has fields', () => {
            it('should reply a list of users with the asked fields', () => {
                // Given
                const mySpy = sinon.spy();
                const request = {query: {fields: 'username'}};
                const data = [
                    { "username": "PierreTrolle" },
                    { "username": "PierreTrolle" },
                    { "username": "ASA" },
                    { "username": "PTR" }
                ];

                // When
                handlers.getUsers(request, mySpy);

                // Then
                expect(mySpy).to.have.been.calledWith(data);
            });
        });
    });

    describe('.getUser()', () => {
        it('should get User', () => {
            // Given
            const mySpy = sinon.spy();

            // When
            handlers.getUser({}, mySpy);

            // Then
            expect(mySpy).to.have.been.calledWith(require('../data/data_users.json'));
        });

        describe('when request has params', () => {
            it('should reply an user according to the username', () => {
                // Given
                const mySpy = sinon.spy();
                const request = {
                    params: {username: 'PierreTrolle'}
                };
                const data = [
                    {
                        "username": "PierreTrolle",
                        "id" : "1"
                    },
                    {
                        "username": "PierreTrolle",
                        "id" : "4"
                    }
                ];

                // When
                handlers.getUser(request, mySpy);

                // Then
                expect(mySpy).to.have.been.calledWith(data);
            });
        });
    });
});