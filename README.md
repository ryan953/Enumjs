## Enumjs

Create an enum from a object of key/values.

Install with npm.

```sh
npm install enumjs --save
```

Use with node.js, browserify or webpack, etc:

```js
var Enum = require('Enumjs');
```

Or you can use a `<script>` tag to include the `index.js` and it will create a global `Enum` object, or define that object for require.js if it exists.

## Usage

Once the package is installed you can create instances by passing the key/value object to the constructor.

```js
var Enum = require('Enumjs');

const Suits = Enum({
  HEART: 'HEART',
  DIAMOND: 'DIAMOND',
  SPADE: 'SPADE',
  CLUB: 'CLUB',
});
```

Your new Enum is a plain object that's been frozen so no one can edit the fields or values on it. It is enumerable, immutable, and you can the `in` operator, `hasOwnProperty()` just like normal.

```js
console.log('HEART' in Suits)
-> true
console.log(Suits.hasOwnProperty('HEART')
-> true
console.log(Suits.HEART)
-> 'HEART'
console.log(Suits[0])
-> 'HEART'
console.log(Suits.length)
-> 4
```

Also provided are helper methods `Enum.coalesce(enum: Enum, field: string)` and `Enum.enforce(enum: Enum, field: string)`. Each of these test whether the field provided is a member of the enum and return the value if it is. If the value is not a member then coalesce returns null, while enforce throws an error.

```js
console.log(Enum.coalesce(Suits, 'HEART'))
-> 'HEART'
console.log(Enum.coalesce(Suits, 'foobar'))
-> null
console.log(Enum.enforce(Suits, 'SPADE'))
-> 'SPADE'
console.log(Enum.enforce(Suits, 'bizbaz')) // throws Error
```

## Flow.js Types

To turn Enum objects into flow types simply create a flow type using the `$Keys` feature:

```js
type SuitType = $Keys<typeof Suits>;
```

If your values are not the same as the keys then you'll probably just want to type out the flow type as a union of values.
```js
const Suits = Enum({
  HEART: 'suit_hearts',
  DIAMOND: 'suit_diamonds',
  SPADE: 'suit_spades',
  CLUB: 'suit_clubs',
});

type SuitType =
  'suit_diamonds' | 'suit_diamonds' |
  'suit_spades' | 'suit_clubs';
```

## Polyfills

Within `index.js` some new methods are used that are not available on older browsers. See
[`Object.create`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
[`Object.entries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
[`Object.freeze`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
[`Object.values`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)

For Tests:
Similarly the test file also requires `Object.keys`.

`Array.isArray`: see [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) for details about unsupported older browsers (e.g. <= IE8) and a simple polyfill.

`Object.keys`: see [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) for details about unsupported older browsers (e.g. <= IE8) and a simple polyfill. This is only used in `dedupe.js`.
