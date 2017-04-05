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
	obj.second = 'beef;
	console.log(obj); //{ first: 'pork', second: 'beef' }
	```
