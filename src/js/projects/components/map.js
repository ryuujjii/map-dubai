import { queryMatches, setPropertyTo } from 'utils';
import { Draggable } from "gsap/Draggable.js";

export default function map() {
	function calculateAspectRatio(height) {
		if (queryMatches(575.98)) {
			return height * 9 / 16;
		}
		return height * 16 / 9;
	}
	function handleResize() {
		const screenWidth = window.innerWidth;
		const screenHeight = window.innerHeight;
		let aspectRatioHeight = Number.parseFloat(screenHeight / screenWidth * 100).toFixed(3);
		let aspectRatioWidth = Number.parseFloat((calculateAspectRatio(screenHeight) / screenWidth) * 100).toFixed(3);
		setPropertyTo(document.documentElement, "--aspect-ratio-height", aspectRatioHeight);
		setPropertyTo(document.documentElement, "--aspect-ratio-width", aspectRatioWidth);
	}

	handleResize();
	window.addEventListener('resize', handleResize);
	drag();
}

function drag() {
	Draggable.create(".masterplan__media", {
		bounds: ".masterplan__wrapper",
		type: "x",
		inertia: true,
	}
	);

	const hand = document.querySelector(".masterplan__draggable-hand");

	hand.addEventListener("click", () => {
		hand.classList.add("hide");
	});
	hand.addEventListener("touchstart", () => {
		hand.classList.add("hide");
	});
}