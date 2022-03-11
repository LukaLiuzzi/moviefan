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
