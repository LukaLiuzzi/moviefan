const showTrailers = (movie) => {
	fetch(base_url + "/movie/" + movie.id + "/videos?" + api_key + "&language=es")
		.then((res) => res.json())
		.then((videoData) => {
			if (videoData) {
				if (videoData.results.length > 0) {
					document.getElementById("overlay-trailers").style.width = "100%";
					let embed = [];
					let dots = [];

					videoData.results.forEach((video, idx) => {
						const { name, key, site } = video;

						if (site === "YouTube") {
							embed.push(`
							<iframe src="https://www.youtube.com/embed/${key}" class="embed hide" title="${name}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);

							dots.push(`
							<span class="dot"> ${idx + 1}</span>`);
						}
					});

					let content = `
					<h2 class="text-white text-center">${movie.title}</h2>
					<br/>

					${embed.join("")};
					<br/>

					<div class="dots"> ${dots.join("")}</div>

					`;

					overlayTrailerContent.innerHTML = content;
					showVideos();
				} else {
					const alert = document.createElement("div");
					alert.innerHTML = `
					<div class="alert alert-danger d-flex justify-content-center align-items-center no-trailers" role="alert">
					<div>
					<i class="fas fa-exclamation-triangle"></i> <span class="text-black fw-bold">La pelicula "${movie.title}" no tiene trailer!</span>
					</div>
					`;
					document.body.prepend(alert);

					setTimeout(() => {
						alert.remove();
					}, 3000);
				}
			}
		});
};

const showVideos = () => {
	const embedClasses = document.querySelectorAll(".embed");
	const dots = document.querySelectorAll(".dot");
	totalVideos = embedClasses.length;
	embedClasses.forEach((embedTag, idx) => {
		if (activeSlide === idx) {
			embedTag.classList.add("show");
			embedTag.classList.remove("hide");
		} else {
			embedTag.classList.add("hide");
			embedTag.classList.remove("show");
		}
	});

	dots.forEach((dot, index) => {
		activeSlide === index
			? dot.classList.add("active")
			: dot.classList.remove("active");
	});

	document.querySelector("html").classList.add("stop-scrolling");
};

const trailerPrev = prevTrailerArrow.addEventListener("click", () => {
	stopVideos();
	activeSlide > 0 ? activeSlide-- : (activeSlide = totalVideos - 1);

	showVideos();
});

const trailerNext = nextTrailerArrow.addEventListener("click", () => {
	stopVideos();
	activeSlide < totalVideos - 1 ? activeSlide++ : (activeSlide = 0);

	showVideos();
});

let stopVideos = () => {
	let videos = document.querySelectorAll("iframe, video");
	Array.prototype.forEach.call(videos, (video) => {
		if (video.tagName.toLowerCase() === "video") {
			video.pause();
		} else {
			let src = video.src;
			video.src = src;
		}
	});
};

const closeOverlayTrailers = () => {
	document.getElementById("overlay-trailers").style.width = "0%";
	stopVideos();
	document.querySelector("html").classList.remove("stop-scrolling");
};

const trailerClose = (document.getElementById("close-trailers-btn").onclick =
	() => {
		closeOverlayTrailers();
	});
