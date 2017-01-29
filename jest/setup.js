var entries = require('object.entries');
if (!Object.entries) {
  entries.shim();
}

var values = require('object.values');
if (!Object.values) {
  values.shim();
}

global.__DEV__ = true;
