var assert = require('assert');
var prettyFormat = require('./');

function returnArguments() {
  return arguments;
}

describe('prettyFormat()', function() {
  it('should print empty arguments', function() {
    var val = returnArguments();
    assert.equal(prettyFormat(val), 'Arguments []');
  });

  it('should print arguments', function() {
    var val = returnArguments(1, 2, 3);
    assert.equal(prettyFormat(val), 'Arguments [\n  1,\n  2,\n  3\n]');
  });

  it('should print an empty array', function() {
    var val = [];
    assert.equal(prettyFormat(val), 'Array []');
  });

  it('should print an array with items', function() {
    var val = [1, 2, 3];
    assert.equal(prettyFormat(val), 'Array [\n  1,\n  2,\n  3\n]');
  });

  it('should print a typed array', function() {
    var val = new Uint32Array(3);
    assert.equal(prettyFormat(val), 'Uint32Array [\n  0,\n  0,\n  0\n]');
  });

  it('should print an array buffer', function() {
    var val = new ArrayBuffer(3);
    assert.equal(prettyFormat(val), 'ArrayBuffer []');
  });

  it('should print a nested array', function() {
    var val = [[1, 2, 3]];
    assert.equal(prettyFormat(val), 'Array [\n  Array [\n    1,\n    2,\n    3\n  ]\n]');
  });

  it('should print true', function() {
    var val = true;
    assert.equal(prettyFormat(val), 'true');
  });

  it('should print false', function() {
    var val = false;
    assert.equal(prettyFormat(val), 'false');
  });

  it('should print an error', function() {
    var val = new Error();
    assert.equal(prettyFormat(val), '[Error]');
  });

  it('should print a typed error with a message', function() {
    var val = new TypeError('message');
    assert.equal(prettyFormat(val), '[TypeError: message]');
  });

  it('should print a function constructor', function() {
    var val = new Function();
    assert.equal(prettyFormat(val), 'function anonymous() {\n\n}');
  });

  it('should print an anonymous function', function() {
    var val = function() {};
    assert.equal(prettyFormat(val), 'function () {}');
  });

  it('should print a named function', function() {
    var val = function named() {};
    assert.equal(prettyFormat(val), 'function named() {}');
  });

  it('should print Infinity', function() {
    var val = Infinity;
    assert.equal(prettyFormat(val), 'Infinity');
  });

  it('should print -Infinity', function() {
    var val = -Infinity;
    assert.equal(prettyFormat(val), '-Infinity');
  });

  it('should print an empty map', function() {
    var val = new Map();
    assert.equal(prettyFormat(val), 'Map {}');
  });

  it('should print a map with values', function() {
    var val = new Map();
    val.set('prop1', 'value1');
    val.set('prop2', 'value2');
    assert.equal(prettyFormat(val), 'Map {\n  "prop1" => "value1",\n  "prop2" => "value2"\n}');
  });

  it('should print a map with non-string keys', function() {
    var val = new Map();
    val.set({ prop: 'value' }, { prop: 'value' });
    assert.equal(prettyFormat(val), 'Map {\n  Object {\n    "prop": "value"\n  } => Object {\n    "prop": "value"\n  }\n}');
  });

  it('should print NaN', function() {
    var val = NaN;
    assert.equal(prettyFormat(val), 'NaN');
  });

  it('should print null', function() {
    var val = null;
    assert.equal(prettyFormat(val), 'null');
  });

  it('should print a number', function() {
    var val = 123;
    assert.equal(prettyFormat(val), '123');
  });

  it('should print a date', function() {
    var val = new Date(10e11);
    assert.equal(prettyFormat(val), '2001-09-09T01:46:40.000Z');
  });

  it('should print an empty object', function() {
    var val = {};
    assert.equal(prettyFormat(val), 'Object {}');
  });

  it('should print an object with properties', function() {
    var val = { prop1: 'value1', prop2: 'value2' };
    assert.equal(prettyFormat(val), 'Object {\n  "prop1": "value1",\n  "prop2": "value2"\n}');
  });

  it('should print an object with properties and symbols', function() {
    var val = { prop: 'value1' };
    val[Symbol('symbol1')] = 'value2';
    val[Symbol('symbol2')] = 'value3';
    assert.equal(prettyFormat(val), 'Object {\n  "prop": "value1",\n  Symbol(symbol1): "value2",\n  Symbol(symbol2): "value3"\n}');
  });

  it('should print regular expressions from constructors', function() {
    var val = new RegExp('regexp');
    assert.equal(prettyFormat(val), '/regexp/');
  });

  it('should print regular expressions from literals', function() {
    var val = /regexp/ig;
    assert.equal(prettyFormat(val), '/regexp/gi');
  });

  it('should print an empty set', function() {
    var val = new Set();
    assert.equal(prettyFormat(val), 'Set {}');
  });

  it('should print a set with values', function() {
    var val = new Set();
    val.add('value1');
    val.add('value2');
    assert.equal(prettyFormat(val), 'Set {\n  "value1",\n  "value2"\n}');
  });

  it('should print a string', function() {
    var val = 'string';
    assert.equal(prettyFormat(val), '"string"');
  });

  it('should print a symbol', function() {
    var val = Symbol('symbol');
    assert.equal(prettyFormat(val), 'Symbol(symbol)');
  });

  it('should print undefined', function() {
    var val = undefined;
    assert.equal(prettyFormat(val), 'undefined');
  });

  it('should print undefined', function() {
    var val = undefined;
    assert.equal(prettyFormat(val), 'undefined');
  });

  it('should print a WeakMap', function() {
    var val = new WeakMap();
    assert.equal(prettyFormat(val), 'WeakMap {}');
  });

  it('should print a WeakSet', function() {
    var val = new WeakSet();
    assert.equal(prettyFormat(val), 'WeakSet {}');
  });

  it('should print deeply nested objects', function() {
    var val = { prop: { prop: { prop: 'value' } } };
    assert.equal(prettyFormat(val), 'Object {\n  "prop": Object {\n    "prop": Object {\n      "prop": "value"\n    }\n  }\n}');
  });

  it('should print circular references', function() {
    var val = {};
    val.prop = val;
    assert.equal(prettyFormat(val), 'Object {\n  "prop": [Circular]\n}')
  });

  it('should print parallel references', function() {
    var inner = {};
    var val = { prop1: inner, prop2: inner };
    assert.equal(prettyFormat(val), 'Object {\n  "prop1": Object {},\n  "prop2": Object {}\n}')
  });

  it('should be able to customize indent', function() {
    var val = { prop: 'value' };
    assert.equal(prettyFormat(val, { indent: 4 }), 'Object {\n    "prop": "value"\n}');
  });

  it('should be able to customize the max depth', function() {
    var val = { prop: { prop: { prop: {} } } };
    assert.equal(prettyFormat(val, { maxDepth: 2 }), 'Object {\n  "prop": Object {\n    "prop": [Object]\n  }\n}');
  });

  it('should throw on invalid options', function() {
    assert.throws(function() {
      prettyFormat({}, { invalidOption: true });
    });
  });
});
