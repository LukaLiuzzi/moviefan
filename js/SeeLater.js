import * as variable from "./Variables.js";
import showMovies from "./ShowMovies.js";
import scrollToMovies from "./Scroll.js";

export const addSeeLaterMovies = async (id, type) => {
	const response = await fetch(
		variable.base_url + "/movie/" + id + "?" + variable.api_key + "&language=es"
	);
	const movie = await response.json();
	const result = variable.seeLaterMovies.some((movie) => id === movie.id);
	if (!result) {
		variable.seeLaterMovies.push(movie);
		localStorage.setItem(
			"SeeLaterMovies",
			JSON.stringify(variable.seeLaterMovies)
		);
	}
	changeSeeLaterBtn(movie.id, type);
};

export const seeLaterEvent = variable.seeLaterBtn.addEventListener(
	"click",
	() => {
		showMovies(variable.seeLaterMovies, "see-later", movies);
		scrollToMovies();
	}
);

export const removeSeeLaterMovies = (id, type) => {
	const result = variable.seeLaterMovies.find((movie) => movie.id === id);

	const index = variable.seeLaterMovies.indexOf(result);

	variable.seeLaterMovies.splice(index, 1);

	localStorage.setItem(
		"SeeLaterMovies",
		JSON.stringify(variable.seeLaterMovies)
	);

	changeSeeLaterBtn(id, type);
};

export const changeSeeLaterBtn = (id, type) => {
	let result = variable.seeLaterMovies.some((movie) => movie.id === id);

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
