const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const handlers = require('../handlers');
chai.use(require('sinon-chai'));

describe('Handlers', () => {

    describe('.getPierreTrolle()', () => {
        it('should get Pierre Trolle!', () => {
            // Given
            const mySpy = sinon.spy();

            // When
            handlers.getPierreTrolle({}, mySpy);

            // Then
            expect(mySpy).to.have.been.calledWith(require('../data/data_pierretrolle.json'));
        });

        describe('when request has fields', () => {
            it('should reply a list of countries with the asked fields', () => {
                // Given
                const mySpy = sinon.spy();
                const request = {query: {fields: 'country'}};
                const data = [
                    { "country": "France" },
                    { "country": "Belgique" },
                    { "country": "Allemagne" }
                ];

                // When
                handlers.getPierreTrolle(request, mySpy);

                // Then
                expect(mySpy).to.have.been.calledWith(data);
            });
        });
    });

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
                    { "username": "Adrien" },
                    { "username": "PTR" }
                ];

                // When
                handlers.getUsers(request, mySpy);

                // Then
                expect(mySpy).to.have.been.calledWith(data);
            });
        });
    });

    describe('.getPierreTrolleFr1c()', () => {
        it('should get Pierre TrolleFr1c !', () => {

            // Given
            const mySpy = sinon.spy();

            // When
            handlers.getPierreTrolleFr1c({}, mySpy);

            // Then
            expect(mySpy).to.have.been.calledWith(require('../data/data_fr_1c.json'));
        });

        describe('when request has fields', () => {
            it('should reply a list of pokemons with the asked fields', () => {
                // Given
                const mySpy = sinon.spy();
                const request = {query: {fields: '1991'}};
                const data = [
                    { "1991": "1" }
                ];

                // When
                handlers.getPierreTrolleFr1c(request, mySpy);

                // Then
                expect(mySpy).to.have.been.calledWith(data);
            });
        });
    });
});