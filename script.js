function getRandomMovie() {
	var min = document.getElementById("minNum").value;
	var max = document.getElementById("maxNum").value;

	console.log("Min: "+min+" Max: "+max);
	var result = randomNum(min, max);
	console.log("Result: "+result);
	document.getElementById("movieNum").innerHTML = result;
}

function randomNum(min, max) {
	if (min == undefined) { min = 0; }
	if (max == undefined) { max = 0; }
	var result = Math.floor((Math.random() * max) + min);
	return result;
}