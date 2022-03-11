export const swiperTrending = new Swiper(".swiper-container-trending", {
	autoplay: {
		delay: 3000,
	},
	speed: 1000,
	centeredSlides: true,
	centeredSlidesBounds: true,
	rewind: true,
	grabCursor: true,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	breakpoints: {
		100: {
			slidesPerView: 1,
			spaceBetween: 10,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 10,
		},
		1024: {
			slidesPerView: 3,
			spaceBetween: 60,
		},
	},
});

export const swiperTopRated = new Swiper(".swiper-container-top-rated", {
	autoplay: {
		delay: 5000,
	},
	speed: 1000,
	centeredSlides: true,
	centeredSlidesBounds: true,
	rewind: true,
	grabCursor: true,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	breakpoints: {
		100: {
			slidesPerView: 2,
			spaceBetween: 10,
		},
		768: {
			slidesPerView: 3,
			spaceBetween: 10,
		},
		1024: {
			slidesPerView: 6,
			spaceBetween: 30,
		},
	},
});
