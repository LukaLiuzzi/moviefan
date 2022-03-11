import * as variable from "./Variables.js";
import scrollToMovies from "./Scroll.js";
import render from "./Render.js";
import getMovies from "./GetMovies.js";
import showMovies from "./ShowMovies.js";
import {
	showTrailers,
	showVideos,
	trailerPrev,
	trailerNext,
	stopVideos,
	closeOverlayTrailers,
	trailerClose,
} from "./Trailers.js";
import searchAndPaint from "./Search.js";
import { setGenre, highlightSelection, clearBtn, findGenre } from "./Genres.js";
import { pageCall, prevPag, nextPag } from "./Pagination.js";
import {
	addSeeLaterMovies,
	seeLaterEvent,
	removeSeeLaterMovies,
	changeSeeLaterBtn,
} from "./SeeLater.js";
import footerCopy from "./FooterCopy.js";
import { swiperTrending, swiperTopRated } from "./Swiper.js";

// * CALLING DEFAULT FUNCTIONS
setGenre();
getMovies(variable.final_url, "default", variable.movies);
getMovies(variable.request.fetchTrending, "trending", variable.trendingMovies);
getMovies(variable.request.fetchTopRated, "top-rated", variable.topRatedMovies);
