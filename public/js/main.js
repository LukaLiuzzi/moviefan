// Declaration of variables

// API variables
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

// DOM variables
const movies = document.getElementById("movies");
const popularMovies = document.getElementById("popular-movies");
const latestMovies = document.getElementById("latest-movies");
const search = document.getElementById("search");
const form = document.getElementById("form");
const tags = document.getElementById("tags");
const prev = document.getElementById("prev");
const current = document.getElementById("current");
const next = document.getElementById("next");

let currentPage = 1;
let nextPage = 2;
let prevPage = 3;
let lastUrl = "";
let totalPages = 100;

// Functions

// Fetching API
const getMovies = (url) => {
	lastUrl = url;
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			console.log(data.results);
			if (data.results.length !== 0) {
				showMovies(data.results);
				currentPage = data.page;
				nextPage = currentPage + 1;
				prevPage = currentPage - 1;
				totalPages = data.total_pages;

				current.textContent = currentPage;

				document
					.querySelector(".movies-container")
					.scrollIntoView({ behavior: "smooth" });
			} else {
				movies.innerHTML = `<h2 class="text-center">No se encontraron peliculas </h2>`;
			}
		});
};
// Showing data in DOM
const showMovies = (data) => {
	data.forEach((movie) => {
		const { title, poster_path, vote_average, overview, release_date } = movie;
		const cardMovie = `<div class="movie">
		<img src="${
			poster_path
				? IMG_BASE_URL + poster_path
				: "https://picsum.photos/id/237/1000/1000"
		}" alt="${title}" />
		<div class="image-overlay">
			<div class="overview">
				<h3>${title}</h3>
				<span class="info-movie">Genero</span>
				<span class="info-movie ${getColor(
					vote_average
				)}"><i class="fas fa-star"></i> ${
			vote_average !== 0 ? vote_average : "No hay datos"
		}</span>
				<span class="info-movie"
					><i class="far fa-calendar-alt"></i> ${release_date}</span
				>
				<p>
				${overview !== "" ? overview : "No hay información "}
				</p>
			</div>
		</div>
	</div>`;
		movies.innerHTML += cardMovie;
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
		clear.classList.add("dropdown-item", "bg-secondary");
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

// Pagination
const pageCall = (page) => {
	let urlSplit = lastUrl.split("?");
	let queryParams = urlSplit[1].split("&");
	let key = queryParams[queryParams.length - 1].split("=");
	if (key[0] != "page") {
		let url = lastUrl + "&page=" + page;
		movies.innerHTML = "";
		getMovies(url);
	} else {
		key[1] = page.toString();
		let a = key.join("=");
		queryParams[queryParams.length - 1] = a;
		let b = queryParams.join("&");
		let url = urlSplit[0] + "?" + b;
		movies.innerHTML = "";
		getMovies(url);
	}
};

prev.addEventListener("click", () => {
	if (prevPage > 0) {
		pageCall(prevPage);
	}
});

next.addEventListener("click", () => {
	if (nextPage <= totalPages) {
		pageCall(nextPage);
	}
});

// Painting default results
getMovies(API_URL);

// SWIPER
let swiperPopular = new Swiper(".swiper-container-popular", {
	slidesPerGroup: 1,
	loop: true,
	autoplay: {
		delay: 3000,
	},
	speed: 1000,
	centeredSlides: true,
	grabCursor: true,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	breakpoints: {
		100: {
			slidesPerView: 1,
			spaceBetween: 10,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 10,
		},
		1024: {
			slidesPerView: 3,
			spaceBetween: 60,
		},
	},
});

let swiperLatest = new Swiper(".swiper-container-latest", {
	slidesPerGroup: 1,
	loop: true,
	autoplay: {
		delay: 5000,
	},
	speed: 1000,
	centeredSlides: true,
	grabCursor: true,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	breakpoints: {
		100: {
			slidesPerView: 2,
			spaceBetween: 10,
		},
		768: {
			slidesPerView: 3,
			spaceBetween: 10,
		},
		1024: {
			slidesPerView: 6,
			spaceBetween: 30,
		},
	},
});
