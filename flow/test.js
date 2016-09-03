/* @flow */

'use strict';

var Enum = require('../index');

var Suits = Enum.make({
  DIAMOND: 'DIAMOND',
  SPADE: 'SPADE',
  CLUB: 'CLUB',
  HEART: 'HEART',
});

var heart = Enum.coalesce(Suits, 'HEART');
var throwshere = Enum.enforce(Suits, 'BAR');

// $FlowExpectedError
Enum.coalesce(Suits, 1);
// $FlowExpectedError
Enum.coalesce({}, 'rawr');
// $FlowExpectedError
Enum.coalesce([], 'rawr');
// $FlowExpectedError
Enum.coalesce('string', 'rawr');

var clubdot = Suits.CLUB;
var clubsquare = Suits['CLUB'];
var len = Suits.length;
var anotherclub = Suits['2'];
var exists = 'CLUB' in Suits;

Suits.forEach((suit) => {
  Enum.coalesce(Suits, suit);
  Suits[suit];
})
