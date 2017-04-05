"use strict";

function* main() {
	yield 'Hello world!';

	yield 'Hello again!';
}

var obj = main();

console.log(obj); //{}
console.log(obj.next());//{ value: 'Hello world!', done: false }
console.log(obj.next());//{ value: 'Hello again!', done: true }
