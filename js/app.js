"use strict";

// * DECLARATION OF VARIABLES

// * API VARIABLES

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

// * DOM VARIABLES

const movies = document.getElementById("movies");
const trendingMovies = document.getElementById("trending-movies");
const topRatedMovies = document.getElementById("top-rated-movies");
const search = document.getElementById("search");
const form = document.getElementById("form");
const tags = document.getElementById("tags");
const prev = document.getElementById("prev");
const current = document.getElementById("current");
const next = document.getElementById("next");
const overlayTrailerContent = document.getElementById(
	"overlay-trailer-content"
);
const prevTrailerArrow = document.getElementById("left-arrow");
const nextTrailerArrow = document.getElementById("right-arrow");
const moviesTitle = document.getElementById("movies-title");
const seeLaterBtn = document.getElementById("see-later");

// * PAGINATION VARIABLES

let currentPage = 1;
let nextPage = 2;
let prevPage = 3;
let lastUrl = "";
let totalPages = 100;

// * TRAILERS VARIABLES

let activeSlide = 0;
let totalVideos = 0;

// * SEE LATER VARIABLES

const seeLaterMovies = JSON.parse(localStorage.getItem("SeeLaterMovies")) || [];

// * FUNCTIONS

// * SCROLL

const scrollToMovies = () => {
	setTimeout(() => {
		moviesTitle.scrollIntoView({ block: "start", behavior: "smooth" });
	}, 300);
};

// * RENDER

const render = (movie, type) => {
	const {
		title,
		poster_path,
		vote_average,
		overview,
		release_date,
		genre_ids,
		id,
	} = movie;

	switch (type) {
		case "default":
			return `<div class="movie">
			<img src="${
				poster_path
					? img_url + poster_path
					: "https://picsum.photos/id/237/1000/1000"
			}" alt="${title}" />
			<div class="image-overlay">
				<div class="overview">
					<h3>${title}</h3>
					<span class="info-movie fs-5">${findGenre(genre_ids)}</span>
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
					<button id="${type}-${id}" class="btn btn-secondary fs-4">Ver trailer</button>
					<button id="see-later-${type}-${id}" class="btn btn-warning fs-4">+</button>
					<button id="remove-see-later-${type}-${id}" class="btn btn-danger fs-4">-</button>
				</div>
			</div>
		</div>`;

		case "trending":
			return `<img src="${
				poster_path
					? img_url + poster_path
					: "https://picsum.photos/id/237/1000/1000"
			}" alt="${title}" />
	<div class="image-overlay">
		<div class="overview">
			<h3>${title}</h3>
			<span class="info-movie fs-5">${findGenre(genre_ids)}</span>
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
			<button id="${type}-${id}" class="btn btn-secondary fs-4">Ver trailer</button>
			<button id="see-later-${type}-${id}" class="btn btn-warning fs-4">+</button>
			<button id="remove-see-later-${type}-${id}" class="btn btn-danger fs-4">-</button>
		</div>
	</div>`;

		case "top-rated":
			return `<img src="${
				poster_path
					? img_url + poster_path
					: "https://picsum.photos/id/237/1000/1000"
			}" alt="${title}" />
	<div class="image-overlay">
		<div class="overview">
			<h3>${title}</h3>
			<span class="info-movie fs-5">${findGenre(genre_ids)}</span>
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
			<button id="${type}-${id}" class="btn btn-secondary fs-4">Ver trailer</button>
			<button id="see-later-${type}-${id}" class="btn btn-warning fs-4">+</button>
			<button id="remove-see-later-${type}-${id}" class="btn btn-danger fs-4">-</button>
		</div>
	</div>`;

		case "see-later":
			return `<div class="movie">
			<img src="${
				poster_path
					? img_url + poster_path
					: "https://picsum.photos/id/237/1000/1000"
			}" alt="${title}" />
			<div class="image-overlay">
				<div class="overview">
					<h3>${title}</h3>
					<span class="info-movie fs-5">${genres.map((genre) => {
						return " " + genre.name;
					})}</span>
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
					<button id="${type}-${id}" class="btn btn-secondary fs-4">Ver trailer</button>
					<button id="see-later-${type}-${id}" class="btn btn-warning fs-4">+</button>
					<button id="remove-see-later-${type}-${id}" class="btn btn-danger fs-4">-</button>
				</div>
			</div>
		</div>`;

		default:
			console.warn("type not found");
	}
};

// * FETCHING API

const getMovies = (url, type, container) => {
	if (type === "default") {
		lastUrl = url;
	}
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			if (data.results.length !== 0) {
				showMovies(data.results, type, container);
				if (type === "default") {
					currentPage = data.page;
					nextPage = currentPage + 1;
					prevPage = currentPage - 1;
					totalPages = data.total_pages;

					current.textContent = currentPage;
				}
			} else {
				const alert = document.createElement("div");
				alert.innerHTML = `
					<div class="alert alert-danger d-flex justify-content-center align-items-center no-trailers" role="alert">
					<div>
					<i class="fas fa-exclamation-triangle"></i> <span class="text-black fw-bold">No se encontraron peliculas!</span>
					</div>
					`;
				document.body.prepend(alert);

				setTimeout(() => {
					alert.remove();
				}, 3000);
			}
		});
};

// * SHOWING DATA IN DOM

document.getElementById("copy").textContent =
	"All rights reserved • " + new Date().getFullYear();

// * SHOW MOVIES

const showMovies = (data, type, container) => {
	if (type === "see-later") {
		movies.innerHTML = "";
		moviesTitle.textContent = "Ver mas tarde";

		if (document.querySelector(".pagination")) {
			document.querySelector(".pagination").remove();
		}

		const existBackBtn = document.getElementById("back-btn");
		if (!existBackBtn) {
			const backBtn = document.createElement("div");
			backBtn.id = "back-btn";
			backBtn.innerHTML = `<button class="btn btn-success fs-2 my-5 d-block mx-auto">Volver</button>`;
			document.querySelector(".movies-container").append(backBtn);
			backBtn.onclick = () => {
				window.location = "index.html";
			};
		}
	}

	data.forEach((movie) => {
		const cardMovie = document.createElement("div");

		if (type === "trending" || type === "top-rated") {
			cardMovie.classList.add("swiper-slide", "movie");
		}

		cardMovie.innerHTML = render(movie, type);
		container.appendChild(cardMovie);

		if (document.getElementById(`${type}-${movie.id}`)) {
			document
				.getElementById(`${type}-${movie.id}`)
				.addEventListener("click", () => {
					showTrailers(movie);
				});
		}

		if (
			document.getElementById(`see-later-${type}-${movie.id}`) ||
			document.getElementById(`remove-see-later-${type}-${movie.id}`)
		) {
			changeSeeLaterBtn(movie.id, type);
			document
				.getElementById(`see-later-${type}-${movie.id}`)
				.addEventListener("click", () => {
					addSeeLaterMovies(movie.id, type);
				});

			document
				.getElementById(`remove-see-later-${type}-${movie.id}`)
				.addEventListener("click", () => {
					removeSeeLaterMovies(movie.id, type);
				});
		}
	});
};

// * TRAILERS

const showTrailers = (movie) => {
	fetch(base_url + "/movie/" + movie.id + "/videos?" + api_key + "&language=es")
		.then((res) => res.json())
		.then((videoData) => {
			if (videoData) {
				if (videoData.results.length > 0) {
					document.getElementById("overlay-trailers").style.width = "100%";
					let embed = [];
					let dots = [];

					videoData.results.forEach((video, idx) => {
						const { name, key, site } = video;

						if (site === "YouTube") {
							embed.push(`
							<iframe src="https://www.youtube.com/embed/${key}" class="embed hide" title="${name}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);

							dots.push(`
							<span class="dot"> ${idx + 1}</span>`);
						}
					});

					let content = `
					<h2 class="text-white text-center">${movie.title}</h2>
					<br/>

					${embed.join("")};
					<br/>

					<div class="dots"> ${dots.join("")}</div>

					`;

					overlayTrailerContent.innerHTML = content;
					showVideos();
				} else {
					const alert = document.createElement("div");
					alert.innerHTML = `
					<div class="alert alert-danger d-flex justify-content-center align-items-center no-trailers" role="alert">
					<div>
					<i class="fas fa-exclamation-triangle"></i> <span class="text-black fw-bold">La pelicula "${movie.title}" no tiene trailer!</span>
					</div>
					`;
					document.body.prepend(alert);

					setTimeout(() => {
						alert.remove();
					}, 3000);
				}
			}
		});
};

const showVideos = () => {
	const embedClasses = document.querySelectorAll(".embed");
	const dots = document.querySelectorAll(".dot");
	totalVideos = embedClasses.length;
	embedClasses.forEach((embedTag, idx) => {
		if (activeSlide === idx) {
			embedTag.classList.add("show");
			embedTag.classList.remove("hide");
		} else {
			embedTag.classList.add("hide");
			embedTag.classList.remove("show");
		}
	});

	dots.forEach((dot, index) => {
		activeSlide === index
			? dot.classList.add("active")
			: dot.classList.remove("active");
	});

	document.querySelector("html").classList.add("stop-scrolling");
};

prevTrailerArrow.addEventListener("click", () => {
	stopVideos();
	activeSlide > 0 ? activeSlide-- : (activeSlide = totalVideos - 1);

	showVideos();
});

nextTrailerArrow.addEventListener("click", () => {
	stopVideos();
	activeSlide < totalVideos - 1 ? activeSlide++ : (activeSlide = 0);

	showVideos();
});

let stopVideos = () => {
	let videos = document.querySelectorAll("iframe, video");
	Array.prototype.forEach.call(videos, (video) => {
		if (video.tagName.toLowerCase() === "video") {
			video.pause();
		} else {
			let src = video.src;
			video.src = src;
		}
	});
};

const closeOverlayTrailers = () => {
	document.getElementById("overlay-trailers").style.width = "0%";
	stopVideos();
	document.querySelector("html").classList.remove("stop-scrolling");
};

document.getElementById("close-trailers-btn").onclick = () => {
	closeOverlayTrailers();
};
// * PAINTING COLOR ACCORDING TO RESULT

const getColor = (vote) => {
	if (vote >= 7.5) {
		return "text-success";
	} else if (vote < 7.5 && vote >= 5) {
		return "text-warning";
	} else {
		return "text-danger";
	}
};

// * SEARCH AND PAINT

form.addEventListener("submit", (e) => {
	e.preventDefault();

	let searchTerm;
	searchTerm = search.value;
	selectedGenre = [];
	setGenre();

	if (searchTerm) {
		movies.innerHTML = "";
		getMovies(
			search_url + "&language=es&query=" + searchTerm,
			"default",
			movies
		);
	} else {
		movies.innerHTML = "";
		getMovies(final_url, "default", movies);
	}
	scrollToMovies();
});

// * FILTER BY GENRES

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
				final_url + "&with_genres=" + encodeURI(selectedGenre.join(",")),
				"default",
				movies
			);
			highlightSelection();
			scrollToMovies();
		});
		tags.append(genreLi);
	});
};
setGenre();

// * SHOW GENRE SELECTED

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

// * CLEAR FILTER BUTTONS

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
			getMovies(final_url, "default", movies);
			scrollToMovies();
		});
		tags.append(clear);
	}
};

// * FIND GENRE

const findGenre = (Ids) => {
	const genresMoviesNames = genres
		.filter((gen) => Ids.includes(gen.id))
		.map((el) => el.name);

	return genresMoviesNames.join(", ");
};

// * PAGINATION

const pageCall = (page) => {
	let urlSplit = lastUrl.split("?");
	let queryParams = urlSplit[1].split("&");
	let key = queryParams[queryParams.length - 1].split("=");
	if (key[0] != "page") {
		let url = lastUrl + "&page=" + page;
		movies.innerHTML = "";
		getMovies(url, "default", movies);
	} else {
		key[1] = page.toString();
		let a = key.join("=");
		queryParams[queryParams.length - 1] = a;
		let b = queryParams.join("&");
		let url = urlSplit[0] + "?" + b;
		movies.innerHTML = "";
		getMovies(url, "default", movies);
	}
};

prev.addEventListener("click", () => {
	if (prevPage > 0) {
		pageCall(prevPage);
	}
	scrollToMovies();
});

next.addEventListener("click", () => {
	if (nextPage <= totalPages) {
		pageCall(nextPage);
	}
	scrollToMovies();
});

// * SEE LATER

const addSeeLaterMovies = async (id, type) => {
	const response = await fetch(
		base_url + "/movie/" + id + "?" + api_key + "&language=es"
	);
	const movie = await response.json();
	const result = seeLaterMovies.some((movie) => id === movie.id);
	if (!result) {
		seeLaterMovies.push(movie);
		localStorage.setItem("SeeLaterMovies", JSON.stringify(seeLaterMovies));
	}
	changeSeeLaterBtn(movie.id, type);
};

seeLaterBtn.addEventListener("click", () => {
	showMovies(seeLaterMovies, "see-later", movies);
	scrollToMovies();
});

const removeSeeLaterMovies = (id, type) => {
	const result = seeLaterMovies.find((movie) => movie.id === id);

	const index = seeLaterMovies.indexOf(result);

	seeLaterMovies.splice(index, 1);

	localStorage.setItem("SeeLaterMovies", JSON.stringify(seeLaterMovies));

	changeSeeLaterBtn(id, type);
};

const changeSeeLaterBtn = (id, type) => {
	let result = seeLaterMovies.some((movie) => movie.id === id);

	if (result) {
		document.getElementById(`see-later-${type}-${id}`).classList.add("d-none");
		document
			.getElementById(`remove-see-later-${type}-${id}`)
			.classList.remove("d-none");
	} else {
		document
			.getElementById(`see-later-${type}-${id}`)
			.classList.remove("d-none");
		document
			.getElementById(`remove-see-later-${type}-${id}`)
			.classList.add("d-none");
	}
};

// * CALLING DEFAULT FUNCTIONS

getMovies(final_url, "default", movies);
getMovies(request.fetchTrending, "trending", trendingMovies);
getMovies(request.fetchTopRated, "top-rated", topRatedMovies);

// * SWIPERJS

const swiperTrending = new Swiper(".swiper-container-trending", {
	autoplay: {
		delay: 3000,
	},
	speed: 1000,
	centeredSlides: true,
	centeredSlidesBounds: true,
	rewind: true,
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

const swiperTopRated = new Swiper(".swiper-container-top-rated", {
	autoplay: {
		delay: 5000,
	},
	speed: 1000,
	centeredSlides: true,
	centeredSlidesBounds: true,
	rewind: true,
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
