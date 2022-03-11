const searchAndPaint = form.addEventListener("submit", (e) => {
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
