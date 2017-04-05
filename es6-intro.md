# ES6 Intro

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


