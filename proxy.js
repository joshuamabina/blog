"use strict";

var person = new Proxy({}, {
  get: function(target, key, receiver) {
    console.log(`@get ${key}`);

    // some custom logic

    return Reflect.get(target, key, receiver);
  },
  set: function(target, key, value, receiver) {
    console.log(`@set ${key}: ${value}`);

    // some custom logic

    return Reflect.set(target, key, value, receiver);
  }
});

person.name = 'Papa Bear';
console.log(person.name);

