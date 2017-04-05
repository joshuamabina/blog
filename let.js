"use strict";

function main() {
	let foo = "foo";

	if(true) {
		let foo = "bar";
		console.log(foo); //bar
	}

	console.log(foo); //foo
}

main();
