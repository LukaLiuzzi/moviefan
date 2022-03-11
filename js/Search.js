import * as variable from "./Variables.js";
import { setGenre } from "./Genres.js";
import getMovies from "./GetMovies.js";
import scrollToMovies from "./Scroll.js";

const searchAndPaint = form.addEventListener("submit", (e) => {
	e.preventDefault();

	let searchTerm;
	searchTerm = search.value;
	let selectedGenre = [];
	setGenre();

	if (searchTerm) {
		movies.innerHTML = "";
		getMovies(
			variable.search_url + "&language=es&query=" + searchTerm,
			"default",
			movies
		);
	} else {
		movies.innerHTML = "";
		getMovies(variable.final_url, "default", movies);
	}
	scrollToMovies();
});
export default searchAndPaint;
