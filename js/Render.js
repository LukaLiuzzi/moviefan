import * as variable from "./Variables.js";
import { findGenre } from "./Genres.js";
import getColor from "./GetColor.js";

const render = (movie, type) => {
	const {
		title,
		poster_path,
		vote_average,
		overview,
		release_date,
		genre_ids,
		id,
		genres,
	} = movie;

	switch (type) {
		case "default":
			return `<div class="movie">
			<img src="${
				poster_path
					? variable.img_url + poster_path
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
					<button id="see-later-${type}-${id}" class="btn btn-warning fs-4 m-2">+ Ver mas tarde</button>
					<button id="remove-see-later-${type}-${id}" class="btn btn-danger fs-4 m-2">- Ver mas tarde</button>
				</div>
			</div>
		</div>`;

		case "trending":
			return `<img src="${
				poster_path
					? variable.img_url + poster_path
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
			<button id="see-later-${type}-${id}" class="btn btn-warning fs-4 m-2">+ Ver mas tarde</button>
			<button id="remove-see-later-${type}-${id}" class="btn btn-danger fs-4 m-2">- Ver mas tarde</button>
		</div>
	</div>`;

		case "top-rated":
			return `<img src="${
				poster_path
					? variable.img_url + poster_path
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
			<button id="see-later-${type}-${id}" class="btn btn-warning fs-4 m-2">+ Ver mas tarde</button>
			<button id="remove-see-later-${type}-${id}" class="btn btn-danger fs-4 m-2">- Ver mas tarde</button>
		</div>
	</div>`;

		case "see-later":
			return `<div class="movie">
			<img src="${
				poster_path
					? variable.img_url + poster_path
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
					<button id="see-later-${type}-${id}" class="btn btn-warning fs-4 m-2">+ Ver mas tarde</button>
					<button id="remove-see-later-${type}-${id}" class="btn btn-danger fs-4 m-2">- Ver mas tarde</button>
				</div>
			</div>
		</div>`;

		default:
			console.warn("type not found");
	}
};
export default render;
