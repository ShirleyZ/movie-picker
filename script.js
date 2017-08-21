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

// 
function parseCsvMovieList() {
	var csv = document.getElementById("movieList").value;
	console.log(csv);
	// Testing only
	if (csv == "") {
		csv = "A Monster in Paris, 90, Fantasy, Adventure\nTestMovie, 100, Genre 1\nTestOtherMovie, 120, Adventure, Action";
	}

	// sweet sweet string manip action
	var movieFields = ["name", "runtime", "genreOne", "genreTwo"];
	var splitCsv = csv.split("\n");
	console.log(splitCsv);

	var parsedObj = [];
	for (var i = 0; i < splitCsv.length; i++) {
		var movie = {};
		var movieInfo = splitCsv[i].split(',');

		for (var j = 0; j < movieFields.length; j++) {
			if (movieInfo[j] != undefined) {
				movieInfo[j] = movieInfo[j].trim();
				movie[movieFields[j]] = movieInfo[j];
			}
		}

		if (movie["name"] != undefined) {
			parsedObj.push(movie);
		}
	}

	console.log("== Movies from csv");
	console.log(parsedObj);
	return parsedObj;
}