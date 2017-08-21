init();

function init() {
	app = {
		movies: [],
		genres: []
	};

	cons = {
		movieFields: ["name", "runtime", "genre-one", "genre-two"]
	}

}

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
function drawList() {
	var table = document.getElementById('movieTable');
	
	let tr = document.createElement('tr');
	for (let j = 0; j < cons.movieFields.length; j++) {
		let field = cons.movieFields[j];

		let td = document.createElement('td');
		let txt = document.createTextNode(field);

		td.appendChild(txt);
		tr.appendChild(td);
	}
	table.appendChild(tr);

	for (let i = 0; i < app.movies.length; i++) {
		let movie = app.movies[i];

		let tr = document.createElement('tr');
		for (let j = 0; j < cons.movieFields.length; j++) {
			let field = cons.movieFields[j];

			let td = document.createElement('td');
			let txt = document.createTextNode(movie[field]);

			td.appendChild(txt);
			tr.appendChild(td);
		}

		table.appendChild(tr);
	}

}

function parseCsvMovieList() {
	var csv = document.getElementById("csvInput").value;
	console.log(csv);
	// Testing only
	if (csv == "") {
		csv = "A Monster in Paris, 90, Fantasy, Adventure\nTestMovie, 100, Genre 1\nTestOtherMovie, 120, Adventure, Action";
	}

	// sweet sweet string manip action
	var movieFields = cons.movieFields;
	var splitCsv = csv.split("\n");
	console.log(splitCsv);

	var parsedObj = [];
	for (let i = 0; i < splitCsv.length; i++) {
		let movie = {};
		let movieInfo = splitCsv[i].split(',');

		for (let j = 0; j < movieFields.length; j++) {
			if (movieInfo[j] != undefined) {
				movieInfo[j] = movieInfo[j].trim();
				movie[movieFields[j]] = movieInfo[j];
			}
		}

		if (movie["name"] != undefined) {
			parsedObj.push(movie);
		}
	}

	app.movies = parsedObj;

	parseGenresFromMovieList();
	drawList();

	console.log("== Movies from csv");
	console.log(app.movies);

	return parsedObj;
}

function parseGenresFromMovieList() {
	console.log("=== On parseGenresFromMovieList")
	var movies = app.movies;
	var genreIndexes = [];
	var genres = {};

	// Gets which indexes to access to get all genres for a movie
	for (let i = 0; i < cons.movieFields.length; i++) {
		let splitFieldName = cons.movieFields[i].split('-');
		if (splitFieldName[0] == "genre") {
			genreIndexes.push(cons.movieFields[i]);
		}
	}

	console.log("Genre indexes:");
	console.log(genreIndexes);

	// Iterate through a movie and pull out unique genres
	for (let i = 0; i < movies.length; i++) {
		let currMovie = movies[i];
		console.log("= Movie: "+currMovie["name"]);

		for (let j = 0; j < genreIndexes.length; j++) {
			let genreIndex = genreIndexes[j];

			// Using object to use .hasOwnProperty, since js
			//	doesn't have vanilla check in array func
			if (!genres.hasOwnProperty(currMovie[genreIndex])) {
				console.log(currMovie[genreIndex]+" doesn't exist. Adding");
				genres[currMovie[genreIndex]] = true;
			} else {
				console.log(currMovie[genreIndex]+" exists");
			}

		}

	}
	console.log("genres object");
	console.log(genres);

	app.genres = Object.keys(genres);
	console.log("= Genres are");
	console.log(app.genres);
}