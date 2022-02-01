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
const genres = [
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
];

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
			if (data.results.length !== 0) {
				showMovies(data.results);
			} else {
				movies.innerHTML = `<h2 class="text-center">No se encontraron peliculas </h2>`;
			}
		});
};

// Showing data in DOM
const showMovies = (data) => {
	data.forEach((movie) => {
		const { title, poster_path, vote_average, overview, release_date } = movie;
		const card = `<div class="col-12 col-md-6 col-lg-4 col-xxl-2 mb-5">
		<div class="card">
			<img
				src="${
					poster_path
						? IMG_BASE_URL + poster_path
						: "https://picsum.photos/id/237/350/500"
				}"
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
	selectedGenre = [];
	setGenre();

	if (searchTerm) {
		getMovies(SEARCH_URL + "&language=es&query=" + searchTerm);
		movies.innerHTML = "";
	} else {
		movies.innerHTML = "";
		getMovies(API_URL);
	}
});

// Filter by Genres
let selectedGenre = [];

const setGenre = () => {
	tags.innerHTML = "";
	genres.forEach((genre) => {
		const genreLi = document.createElement("LI");
		genreLi.classList.add("dropdown-item");
		genreLi.id = genre.id;
		genreLi.textContent = genre.name;
		genreLi.addEventListener("click", () => {
			if (selectedGenre.length === 0) {
				selectedGenre.push(genre.id);
			} else {
				if (selectedGenre.includes(genre.id)) {
					selectedGenre.forEach((id, idx) => {
						if (id === genre.id) {
							selectedGenre.splice(idx, 1);
						}
					});
				} else {
					selectedGenre.push(genre.id);
				}
			}
			console.log(selectedGenre);
			movies.innerHTML = "";
			getMovies(API_URL + "&with_genres=" + encodeURI(selectedGenre.join(",")));
			highlightSelection();
		});
		tags.append(genreLi);
	});
};
setGenre();

// Show genre selected
const highlightSelection = () => {
	const tags = document.querySelectorAll(".dropdown-item");
	tags.forEach((tag) => {
		tag.classList.remove("highlight");
	});
	clearBtn();
	if (selectedGenre.length != 0) {
		selectedGenre.forEach((id) => {
			const highlightedTag = document.getElementById(id);
			highlightedTag.classList.add("highlight");
		});
	}
};

// Clear filter buttons
const clearBtn = () => {
	const clearBtn = document.getElementById("clear");
	if (!clearBtn) {
		const clear = document.createElement("LI");
		clear.classList.add("dropdown-item", "bg-info");
		clear.id = "clear";
		clear.textContent = "Limpiar filtros";
		clear.addEventListener("click", () => {
			selectedGenre = [];
			setGenre();
			movies.innerHTML = "";
			getMovies(API_URL);
		});
		tags.append(clear);
	}
};

// Painting default results
getMovies(API_URL);
