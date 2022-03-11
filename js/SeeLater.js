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

const seeLaterEvent = seeLaterBtn.addEventListener("click", () => {
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
