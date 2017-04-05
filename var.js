function main() {
	var foo = "ham";

	if(true) {
		var foo = "pork";
		console.log(foo); //pork
	}

	console.log(foo); //pork
}

main();
