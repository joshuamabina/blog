// structuring
var people = ["cain", "goalith", "osama"];
console.log('structuring:', people);

// destructuring
var [foo, bar, baz] = people;
console.log('destructuring:', foo, bar, baz);

//structuring
var fruits = {
	foo: 'orange',
	bar: 'tomator',
	baz: 'cucumber'
};
console.log('structuring:', fruits);

//destructuring
var {foo, bar, baz} = fruits;
console.log('destructuring:', foo, bar, baz);
