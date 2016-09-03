/* eslint-env jasmine */

'use strict';

jest.unmock('../index');
const Enum = require('../index');

const Suits = {
  HEART: 'HEART',
  DIAMOND: 'DIAMOND',
  SPADE: 'SPADE',
  CLUB: 'CLUB',
};
const Ranks = {
  'TWO': 2,
  'THREE': 3,
  'FOUR': 4,
  'FIVE': 5,
  'SIX': 6,
  'SEVEN': 7,
  'EIGHT': 8,
  'NINE': 9,
  'JACK': 'JACK',
  'QUEEN': 'QUEEN',
  'KING': 'KING',
  'ACE': 'ACE',
};

describe('Enum', () => {
  testEnum('Suits', Enum.make(Suits), Suits);
  testEnum('Ranks', Enum.make(Ranks), Ranks);

  describe('.coalesce()', () => {
    var SuitsType = Enum.make(Suits);
    it('Should return the enum value when it is part of the object', () => {
      expect(Enum.coalesce(SuitsType, SuitsType.HEART)).toBe('HEART');
      expect(Enum.coalesce(SuitsType, 'HEART')).toBe('HEART');
    });

    it('Should return null if the value is not part of the enum', () => {
      expect(Enum.coalesce(SuitsType, 'FOO')).toBeNull();
    });

    it('Should be case sensitive checking fields inside object', () => {
      expect(Enum.coalesce(SuitsType, 'Heart')).toBeNull();
    });
  });

  describe('.enforce()', () => {
    var SuitsType = Enum.make(Suits);
    it('Should return the enum value when it is part of the object', () => {
      expect(Enum.enforce(SuitsType, SuitsType.HEART)).toBe('HEART');
      expect(Enum.enforce(SuitsType, 'HEART')).toBe('HEART');
    });

    it('Should return null if the value is not part of the enum', () => {
      expect(
        () => Enum.enforce(SuitsType, 'FOO')
      ).toThrow();
    });

    it('Should be case sensitive checking fields inside object', () => {
      expect(
        () => Enum.enforce(SuitsType, 'Heart')
      ).toThrow();
    });
  });
});

function testEnum(name, object, definition) {
  describe(name, () => {
    it('Should define fields', () => {
      Object.keys(definition).forEach((name) => {
        const value = definition[name];
        expect(name in object).toBeTruthy();
        expect(object.hasOwnProperty(name)).toBeTruthy();
        expect(object[name]).toEqual(value);
      });
    });

    it('Should be enumerable', () => {
      const vals = Object.values(definition);
      expect(object.length).toBe(vals.length);
      expect(object[0]).toEqual(vals[0]);
      expect(object.map(_ => _)).toEqual(vals);
    });

    it('Should not be mutable', () => {
      expect(() => object.__jest_test_value__ = 'immutable').toThrow();
    });

    it('Should have immutable fields', () => {
      Object.keys(definition).forEach((field) => {
        expect(() => object[field] = 'foo').toThrow();
        expect(() => object[field].__jest_test_value__ = 'foo').toThrow();
      });
    });
  });
}
