// Declaration of variables

// API variables
const api_key = "api_key=e11854d9b2dd14d971cfa32f0cc594d7";

const base_url = "https://api.themoviedb.org/3";

const final_url =
	base_url +
	"/discover/movie?" +
	api_key +
	"&language=es&sort_by=popularity.desc";

const img_url = "https://image.tmdb.org/t/p/w500";

const search_url = base_url + "/search/movie?" + api_key;

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

const request = {
	fetchPopular: `${base_url}/discover/movie?${api_key}&language=es&sort_by=popularity.desc`,
	fetchTrending: `${base_url}/trending/movie/day?${api_key}&language=es`,
	fetchTopRated: `${base_url}/discover/movie?${api_key}&language=es&sort_by=vote_average.desc&vote_count.gte=5000&page=${Math.ceil(
		Math.random() * 10
	)}`,
};

// DOM variables
const movies = document.getElementById("movies");
const trendingMovies = document.getElementById("trending-movies");
const topRatedMovies = document.getElementById("top-rated-movies");
const search = document.getElementById("search");
const form = document.getElementById("form");
const tags = document.getElementById("tags");
const prev = document.getElementById("prev");
const current = document.getElementById("current");
const next = document.getElementById("next");
const year = new Date();

// Pagination variables
let currentPage = 1;
let nextPage = 2;
let prevPage = 3;
let lastUrl = "";
let totalPages = 100;

// Functions

// Fetching API

// Default movies
const getMovies = (url) => {
	lastUrl = url;
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			if (data.results.length !== 0) {
				showMovies(data.results);
				currentPage = data.page;
				nextPage = currentPage + 1;
				prevPage = currentPage - 1;
				totalPages = data.total_pages;

				current.textContent = currentPage;

				// document
				// 	.querySelector(".movies-container")
				// 	.scrollIntoView({ behavior: "smooth" });
			} else {
				movies.innerHTML = `<h2 class="text-center">No se encontraron peliculas </h2>`;
			}
		});
};

// Trending movies
const getTrendingMovies = (url) => {
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			if (data.results.length !== 0) {
				showTrendingMovies(data.results);
			}
		});
};

// Top Rated movies
const getTopRatedMovies = (url) => {
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			if (data.results.length !== 0) {
				showTopRatedMovies(data.results);
			}
		});
};

// Showing data in DOM
document.getElementById("copy").textContent =
	"All rights reserved - " + year.getFullYear();

// Default movies
const showMovies = (data) => {
	data.forEach((movie) => {
		const { title, poster_path, vote_average, overview, release_date } = movie;
		const cardMovie = `<div class="movie">
		<img src="${
			poster_path
				? img_url + poster_path
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
				<button class="btn btn-secondary fs-4">Ver trailer</button>
			</div>
		</div>
	</div>`;
		movies.innerHTML += cardMovie;
	});
};

// Trending movies
const showTrendingMovies = (data) => {
	data.forEach((movie) => {
		const { title, poster_path, vote_average, overview, release_date } = movie;
		const cardMovie = `<div class="swiper-slide movie">
		<img src="${
			poster_path
				? img_url + poster_path
				: "https://picsum.photos/id/237/1000/1000"
		}" alt="${title}" />
		<div class="image-overlay">
			<div class="overview">
				<h3>${title}</h3>
				<span class="info-movie">Genero</span>
				<span class="info-movie ${getColor(vote_average)}"
					><i class="fas fa-star"></i> ${
						vote_average !== 0 ? vote_average : "No hay datos"
					}</span
				>
				<span class="info-movie"
					><i class="far fa-calendar-alt"></i> ${release_date}</span
				>
				<p>
				${overview !== "" ? overview : "No hay información "}
				</p>
				<button class="btn btn-secondary fs-4">Ver trailer</button>
			</div>
		</div>
	</div>`;
		trendingMovies.innerHTML += cardMovie;
	});
};

// Top Rated movies
const showTopRatedMovies = (data) => {
	data.forEach((movie) => {
		const { title, poster_path, vote_average, overview, release_date } = movie;
		const cardMovie = `<div class="swiper-slide movie">
		<img src="${
			poster_path
				? img_url + poster_path
				: "https://picsum.photos/id/237/1000/1000"
		}" alt="${title}" />
		<div class="image-overlay">
			<div class="overview">
				<h3>${title}</h3>
				<span class="info-movie">Genero</span>
				<span class="info-movie ${getColor(vote_average)}"
					><i class="fas fa-star"></i> ${
						vote_average !== 0 ? vote_average : "No hay datos"
					}</span
				>
				<span class="info-movie"
					><i class="far fa-calendar-alt"></i> ${release_date}</span
				>
				<p>
				${overview !== "" ? overview : "No hay información "}
				</p>
				<button class="btn btn-secondary fs-4">Ver trailer</button>
			</div>
		</div>
	</div>`;
		topRatedMovies.innerHTML += cardMovie;
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
		movies.innerHTML = "";
		getMovies(search_url + "&language=es&query=" + searchTerm);
	} else {
		movies.innerHTML = "";
		getMovies(final_url);
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
			movies.innerHTML = "";
			getMovies(
				final_url + "&with_genres=" + encodeURI(selectedGenre.join(","))
			);
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
			getMovies(final_url);
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
getMovies(final_url);
getTrendingMovies(request.fetchTrending);
getTopRatedMovies(request.fetchTopRated);

// SWIPER
let swiperTrending = new Swiper(".swiper-container-trending", {
	slidesPerGroup: 1,
	loop: true,
	autoplay: {
		delay: 3000,
	},
	speed: 1000,
	centeredSlides: false,
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

let swiperTopRated = new Swiper(".swiper-container-top-rated", {
	slidesPerGroup: 1,
	loop: true,
	autoplay: {
		delay: 5000,
	},
	speed: 1000,
	centeredSlides: false,
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
