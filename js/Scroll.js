import * as variable from "./Variables.js";

const scrollToMovies = () => {
	setTimeout(() => {
		variable.moviesTitle.scrollIntoView({ block: "start", behavior: "smooth" });
	}, 300);
};
export default scrollToMovies;
