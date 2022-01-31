// Declaration of variables
const API_KEY = "api_key=e11854d9b2dd14d971cfa32f0cc594d7";
const BASE_URL = "https://api.themoviedb.org/3/";
const API_URL =
	BASE_URL +
	"discover/movie?" +
	API_KEY +
	"&primary_release_date.gte=2021-01-31&primary_release_date.lte=2022-01-31&language=es";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
const SEARCH_URL = BASE_URL + "search/movie?" + API_KEY;
const genres = {
	genres: [
		{
			id: 28,
			name: "Acción",
		},
		{
			id: 12,
			name: "Aventura",
		},
		{
			id: 16,
			name: "Animación",
		},
		{
			id: 35,
			name: "Comedia",
		},
		{
			id: 80,
			name: "Crimen",
		},
		{
			id: 99,
			name: "Documental",
		},
		{
			id: 18,
			name: "Drama",
		},
		{
			id: 10751,
			name: "Familia",
		},
		{
			id: 14,
			name: "Fantasía",
		},
		{
			id: 36,
			name: "Historia",
		},
		{
			id: 27,
			name: "Terror",
		},
		{
			id: 10402,
			name: "Música",
		},
		{
			id: 9648,
			name: "Misterio",
		},
		{
			id: 10749,
			name: "Romance",
		},
		{
			id: 878,
			name: "Ciencia ficción",
		},
		{
			id: 10770,
			name: "Película de TV",
		},
		{
			id: 53,
			name: "Suspense",
		},
		{
			id: 10752,
			name: "Bélica",
		},
		{
			id: 37,
			name: "Western",
		},
	],
};

const movies = document.getElementById("movies");
const search = document.getElementById("search");
const form = document.getElementById("form");
const tags = document.getElementById("tags");

// Functions

// Fetching API
const getMovies = (url) => {
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			console.log(data.results);
			showMovies(data.results);
		});
};

// Showing data in DOM
const showMovies = (data) => {
	data.forEach((movie) => {
		const { title, poster_path, vote_average, overview, release_date } = movie;
		const card = `<div class="col-12 col-md-6 col-lg-4 col-xxl-2 mb-5">
		<div class="card">
			<img
				src="${IMG_BASE_URL + poster_path}"
				class="card-img-top"
				alt="${title}"
			/>
			<div class="card-body">
				<h5 class="card-title m-0 fs-1">${title}</h5>
				<p class="card-text overview fs-3">
				${overview}
				</p>
			</div>
			<ul class="list-group list-group-flush">
				<li class="list-group-item">Accion</li>
				<li class="list-group-item ${getColor(vote_average)}">${vote_average}</li>
				<li class="list-group-item">${release_date}</li>
			</ul>
		</div>
	</div>`;
		movies.innerHTML += card;
	});
};

// Painting color according to result
const getColor = (vote) => {
	if (vote >= 7.5) {
		return "text-success";
	} else if (vote < 7.5 && vote >= 5) {
		return "text-warning";
	} else {
		return "text-danger";
	}
};

// Search and paint
form.addEventListener("submit", (e) => {
	e.preventDefault();

	searchTerm = search.value;

	if (searchTerm) {
		getMovies(SEARCH_URL + "&language=es&query=" + searchTerm);
		movies.innerHTML = "";
	} else {
		movies.innerHTML = "";
		getMovies(API_URL);
	}
});

// Painting default results
getMovies(API_URL);
