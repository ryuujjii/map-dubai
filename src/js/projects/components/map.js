import { queryMatches, setPropertyTo } from 'utils';
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
}