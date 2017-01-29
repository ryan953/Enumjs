/* global define, __DEV__ */

var __DEV__ = global.__DEV__ || '';
var define = global.define || null;

(function () {
  'use strict';

  function Enum(dfn) {
    const props = {};
    const vals = [];
    Object.entries(dfn).forEach(([key, value]) => {
      props[key] = {value};
      vals.push(value);
    });
    return Object.freeze(
      Object.create(vals, props)
    );
  }

  var Enumjs = {
    make: function(dfn) {
      return new Enum(dfn);
    },

    coalesce: function(obj, field) {
      if (
        obj &&
        typeof obj === 'object' &&
        (field in obj || field in Object.values(obj))
      ) {
        return field;
      }
      return null;
    },

    enforce: function(obj, field) {
      var value = Enumjs.coalesce(obj, field);
      if (value !== null) {
        return value;
      }
      if (__DEV__) {
        throw new Error('Value ' + field + ' not found in object ' + obj);
      } else {
        throw new Error('Invalid Enum.');
      }
    },
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Enumjs;
  } else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
    // same as npm pacakge name
    define('Enumjs', [], function () {
      return Enumjs;
    });
  } else {
    window.Enumjs = Enumjs;
  }
}());
