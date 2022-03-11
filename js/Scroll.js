const scrollToMovies = () => {
	setTimeout(() => {
		moviesTitle.scrollIntoView({ block: "start", behavior: "smooth" });
	}, 300);
};
