const guideButton = document.querySelector(".guide-button");
const guide = document.querySelector(".guide");

guideButton.addEventListener("click", (e) => {
	guide.classList.toggle("left0");
});

window.addEventListener("scroll", (e) => {
	guide.classList.remove("left0");
});
