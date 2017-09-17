# ES6 Intro

## Pending

- Promises
- Tooling: Webpack and Babel

## Variables

- **var**: original, function scope

```js
"use strict";

function() {
var foo = "foo";

if(true) {
foo = "hello";
console.log(foo); //hello
}

console.log(foo); //hello

}
```

- **let**: ES6, similar to var, block scope

```js
"use strict";
function() {
let bar = "bar";

if(true) {
bar = "yellow";
console.log(bar); //yellow
}

console.log(bar); //bar
}
```

- **const**: ES6, cannot be re-assigned. Not to be confused with Immutable data types.

```js
"use strict";

const baz = "baz";
baz = "beer"; //TypeError: Assignment to constant variable

const obj = {
first: 'apple',
second: 'orange'
};
console.log(obj); //{ first: 'apple', second: 'orange' }

obj.first = 'pork';
obj.second = 'beef';
console.log(obj); //{ first: 'pork', second: 'beef' }
```
## Destructuring

- What is a structuring?

```js
// Structuring: store a collection in a data structure

var animals = [ 'lion', 'bear', 'rhino' ];
console.log(animals) // [ 'lion', 'bear', 'rhino' ]
```
- What is destructuring?

```js
// Original syntax 
var foo = animals[0];
var bar = animals[1];
var baz = animals[2];

// ES6 syntax
var [foo, bar, baz] = animals;
```
## Spread operator

> In a nutshell... The three dot operator

```js
function main(arg1, ...args) {
console.log(arg1, args);
}

main('hello', 'world', 'irabu', 'family', 'friends');
```
## Arrow functions

Commonly known to others as lambdas.

```js
var primes = [1, 2, 3, 5, 7];

// Before ES6
primes.map(function(prime) {
console.log(prime * 2);
});

// ES6 syntax
primes.map((prime) => console.log(prime * 2));
```
## Template literals

```js
var foo = "cow";
var bar = "moon";

//Original syntax
console.log("The " + foo + " jumped over the " + bar);

// ES6 syntax
console.log(`The ${foo} jumped over the ${bar}`);
```

## Classes

> Create classes, getters, setters, extend and the like.

```js
"use strict";

class Person {
constructor(name, lang) {
this.name = name;
this.lang = lang;
}

speaks() {
return `${this.name} speaks ${this.lang}`;
}
};

var foo = new Person('Magufuli', 'Swahili');
console.log(foo);

```
## Generators (and Iterators)

It **looks like** a function...

```js
function* foo() {
yield 'Hello world!';
yield 'Hello again!';
} 
```
- Regular functions start with `function`. Generator functions start with `function*`.
- Regular functions `return` stuff. Generator functions `yield` stuff.
- Regular functions cannot stop themselves. Generator functions can.

> Generators are not threads

> When a generator runs, it runs in the same thread as a caller. The order of execution is sequential and deterministic, and never concurrent. 

```bash
> var obj = foo()
{}
> obj.next()
{ value: 'Hello world!', done: false }
> obj.next()
{ value: 'Hello again!', done: true }
```
> Generators are iterators

> All generators have a built-in implementation of `.next()` and `[Symbol.iterator]()`. One just writes the looping behavior.

## Symbols

The seventh data type.

- Undefined
- Null
- Boolean
- Number
- String
- Object
- **Symbol**

They aren't like anything else.

```bash
> typeof String()
'string'

> typeof Number()
'number'

> typeof Symbol()
'symbol'
```
They are immutable, once created.

- You can not set properties on them.
- If using **use strict**, you'll get a TypeError.

> Calling `Symbol()` generates a unique value without risking name collisions.

```js
var foo = new Symbol();

var obj[foo] = "Hello, world!";
console.log(obj[foo]); //Hello, world!
```
## Proxy

> *n.* The authority to act for another.

> [Proxy - Definition and Meaning](https://www.wordnik.com/words/proxy)

```js
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
```

