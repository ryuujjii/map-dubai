import { queryMatches } from 'utils';
export default function map() {
    function calculateAspectRatioDesc(height) {
        return height * 16 / 9;
    }
    function calculateAspectRatioMob(height) {
        return height * 9 / 16;
    }

    function handleResize() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        let aspectRatioHeight = Number.parseFloat(screenHeight / screenWidth * 100).toFixed(3);
        let aspectRatioWidth;

        if (!queryMatches(575.98)) {
            aspectRatioWidth = Number.parseFloat((calculateAspectRatioDesc(screenHeight) / screenWidth) * 100).toFixed(3);
        } else {
            aspectRatioWidth = Number.parseFloat((calculateAspectRatioMob(screenHeight) / screenWidth) * 100).toFixed(3);
        }


        document.documentElement.style.setProperty("--aspect-ratio-height", aspectRatioHeight);
        document.documentElement.style.setProperty("--aspect-ratio-width", aspectRatioWidth);
    }

    handleResize();

    window.addEventListener('resize', handleResize);
}