// * API VARIABLES

export const api_key = "api_key=e11854d9b2dd14d971cfa32f0cc594d7";

export const base_url = "https://api.themoviedb.org/3";

export const final_url =
	base_url +
	"/discover/movie?" +
	api_key +
	"&language=es&sort_by=popularity.desc";

export const img_url = "https://image.tmdb.org/t/p/w500";

export const search_url = base_url + "/search/movie?" + api_key;

export const genres = [
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

export const request = {
	fetchPopular: `${base_url}/discover/movie?${api_key}&language=es&sort_by=popularity.desc`,
	fetchTrending: `${base_url}/trending/movie/day?${api_key}&language=es`,
	fetchTopRated: `${base_url}/discover/movie?${api_key}&language=es&sort_by=vote_average.desc&vote_count.gte=5000&page=${Math.ceil(
		Math.random() * 10
	)}`,
};

// * DOM VARIABLES

export const movies = document.getElementById("movies");
export const trendingMovies = document.getElementById("trending-movies");
export const topRatedMovies = document.getElementById("top-rated-movies");
export const search = document.getElementById("search");
export const form = document.getElementById("form");
export const tags = document.getElementById("tags");
export const prev = document.getElementById("prev");
export const current = document.getElementById("current");
export const next = document.getElementById("next");
export const overlayTrailerContent = document.getElementById(
	"overlay-trailer-content"
);
export const prevTrailerArrow = document.getElementById("left-arrow");
export const nextTrailerArrow = document.getElementById("right-arrow");
export const moviesTitle = document.getElementById("movies-title");
export const seeLaterBtn = document.getElementById("see-later");

// * SEE LATER VARIABLES

export const seeLaterMovies =
	JSON.parse(localStorage.getItem("SeeLaterMovies")) || [];
