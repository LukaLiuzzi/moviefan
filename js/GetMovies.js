import * as variable from "./Variables.js";
import showMovies from "./ShowMovies.js";

// * VARIABLES
export let lastUrl;
export let currentPage;
export let prevPage;
export let nextPage = 1;
export let totalPages = 100;

// * FETCH DATA

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
export default getMovies;
