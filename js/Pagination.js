import * as variable from "./Variables.js";
import scrollToMovies from "./Scroll.js";
import getMovies, {
	lastUrl,
	prevPage,
	nextPage,
	totalPages,
} from "./GetMovies.js";

export const pageCall = (page) => {
	let urlSplit = lastUrl.split("?");
	let queryParams = urlSplit[1].split("&");
	let key = queryParams[queryParams.length - 1].split("=");
	if (key[0] != "page") {
		let url = lastUrl + "&page=" + page;
		movies.innerHTML = "";
		getMovies(url, "default", movies);
	} else {
		key[1] = page.toString();
		let a = key.join("=");
		queryParams[queryParams.length - 1] = a;
		let b = queryParams.join("&");
		let url = urlSplit[0] + "?" + b;
		movies.innerHTML = "";
		getMovies(url, "default", movies);
	}
};

export const prevPag = prev.addEventListener("click", () => {
	if (prevPage > 0) {
		pageCall(prevPage);
	}
	scrollToMovies();
});

export const nextPag = next.addEventListener("click", () => {
	if (nextPage <= totalPages) {
		pageCall(nextPage);
	}
	scrollToMovies();
});
