"use strict";

const foo = {
	first: 'apple',
	second: 'orange',
};

console.log(foo); //{ first: 'apple', second: 'orange' }

foo.first = 'pork';
foo.second = 'beef';

console.log(foo); //{ first: 'pork', second: 'beef' }
