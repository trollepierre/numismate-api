const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const handlers = require('../handlers');
chai.use(require('sinon-chai'));

describe('Handlers', () => {

  describe('.helloWorld()', () => {
    it('should reply with Hello World !', () => {
      // Given
      const mySpy = sinon.spy();

      // When
      handlers.helloWorld({}, mySpy);

      // Then
      expect(mySpy).to.have.been.calledWith('Hello world!');
    });
  });

  describe('.getAllPokemons()', () => {
    it('should get all pokemons !', () => {
      // Given
      const mySpy = sinon.spy();

      // When
      handlers.getAllPokemons({}, mySpy);

      // Then
      expect(mySpy).to.have.been.calledWith(require('../data.json'));
    });


    describe('when request has fields', () => {
      it('should reply a list of pokemons with the asked fields', () => {
        // Given
        const mySpy = sinon.spy();
        const request = {query: {fields: 'name'}};
        const data = [
              { "name": "Pikachu" },
              { "name": "Dracaufeu"},
              { "name": "Rattata"},
              { "name": "Roucool"},
              { "name": "Nidoran"},
              { "name": "Hypocéan"},
              { "name": "Kabuto"}
            ];

            // When
                handlers.getAllPokemons(request, mySpy);

            // Then
                expect(mySpy).to.have.been.calledWith(data);
      });
    });
});

  describe('.getDays()', () => {
    it('should get days !', () => {
    // Given
    const mySpy = sinon.spy();

    // When
    handlers.getDays({}, mySpy);

    // Then
    expect(mySpy).to.have.been.calledWith([]);
  });
});
});