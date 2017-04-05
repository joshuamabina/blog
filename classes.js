"use strict";

class Person {
	constructor(name) {
		this.name = name;
	}

	speaks() {
		return `${this.name} => Dunno!`;
	}
};

class Tanzanian extends Person {
	constructor(name) {
		super(name);
		this.name = name;
	}

	speaks() {
		return `${this.name} => Swahili`;
	}
};

var p1 = new Person("X!");
console.log(p1.speaks());

var p2 = new Tanzanian("Magufuli");
console.log(p2.speaks());

