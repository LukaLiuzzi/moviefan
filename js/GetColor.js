const getColor = (vote) => {
	if (vote >= 7.5) {
		return "text-success";
	} else if (vote < 7.5 && vote >= 5) {
		return "text-warning";
	} else {
		return "text-danger";
	}
};
