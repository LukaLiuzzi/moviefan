import * as variable from "./Variables.js";
import render from "./Render.js";
import {
	changeSeeLaterBtn,
	addSeeLaterMovies,
	removeSeeLaterMovies,
} from "./SeeLater.js";
import { showTrailers } from "./Trailers.js";

const showMovies = (data, type, container) => {
	if (type === "see-later") {
		movies.innerHTML = "";
		variable.moviesTitle.textContent = "Ver mas tarde";

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
export default showMovies;
