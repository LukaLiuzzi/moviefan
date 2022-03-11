import * as variable from "./Variables.js";
import getMovies from "./GetMovies.js";
import scrollToMovies from "./Scroll.js";

let copy = Object.assign([], variable.selectedGenre);

// * SET GENRE

export const setGenre = () => {
	tags.innerHTML = "";
	variable.genres.forEach((genre) => {
		const genreLi = document.createElement("LI");
		genreLi.classList.add("dropdown-item");
		genreLi.id = genre.id;
		genreLi.textContent = genre.name;
		genreLi.addEventListener("click", () => {
			if (copy.length === 0) {
				copy.push(genre.id);
			} else {
				if (copy.includes(genre.id)) {
					copy.forEach((id, idx) => {
						if (id === genre.id) {
							copy.splice(idx, 1);
						}
					});
				} else {
					copy.push(genre.id);
				}
			}
			movies.innerHTML = "";
			getMovies(
				variable.final_url + "&with_genres=" + encodeURI(copy.join(",")),
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

export const highlightSelection = () => {
	const tags = document.querySelectorAll(".dropdown-item");
	tags.forEach((tag) => {
		tag.classList.remove("highlight");
	});
	clearBtn();
	if (copy.length != 0) {
		copy.forEach((id) => {
			const highlightedTag = document.getElementById(id);
			highlightedTag.classList.add("highlight");
		});
	}
};

// * CLEAR FILTER BUTTONS

export const clearBtn = () => {
	const clearBtn = document.getElementById("clear");
	if (!clearBtn) {
		const clear = document.createElement("LI");
		clear.classList.add("dropdown-item", "bg-secondary");
		clear.id = "clear";
		clear.textContent = "Limpiar filtros";
		clear.addEventListener("click", () => {
			copy = [];
			setGenre();
			movies.innerHTML = "";
			getMovies(variable.final_url, "default", movies);
			scrollToMovies();
		});
		tags.append(clear);
	}
};

// * FIND GENRE

export const findGenre = (Ids) => {
	const genresMoviesNames = variable.genres
		.filter((gen) => Ids.includes(gen.id))
		.map((el) => el.name);

	return genresMoviesNames.join(", ");
};
