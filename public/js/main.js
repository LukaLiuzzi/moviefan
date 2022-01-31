// Menu de navegacion de filtros
const guideButton = document.querySelector(".guide-button");
const guide = document.querySelector(".guide");

guideButton.addEventListener("click", (e) => {
	guide.classList.toggle("left0");
});

window.addEventListener("scroll", (e) => {
	guide.classList.remove("left0");
});

// Trayendo datos de la api
const API_KEY = "api_key=e11854d9b2dd14d971cfa32f0cc594d7";
const BASE_URL = "https://api.themoviedb.org/3/";
const API_URL =
	BASE_URL +
	"discover/movie?" +
	API_KEY +
	"&language=es&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const getMovies = (url) => {
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			console.log(data.results);
			showMovies(data.results);
		});
};

const showMovies = (data) => {
	data.forEach((movie) => {
		const { title, poster_path, vote_average, overview } = movie;
		const card = `<div class="card">
			<div class="movie-img">
			<img src="${IMG_BASE_URL + poster_path}" alt="${title}" />
			</div>
			<div class="movie-title">
			<h3>${title}</h3>
			</div> 
			</div>`;
		document.getElementById("movies").innerHTML += card;
	});
};

getMovies(API_URL);
