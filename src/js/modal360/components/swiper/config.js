import { queryMatches } from 'utils';

export function config() {
  let widthViewerSlide;
  let viewerSwiperPrerView;
  let conditionViewerSlides;
  let initialWidthViewerSwiper;
  let actualSwiperWidth;
  if (!queryMatches(767)) {
    widthViewerSlide = 60;
    viewerSwiperPrerView = 5;
    initialWidthViewerSwiper = 280;
  } else {
    widthViewerSlide = 100;
    viewerSwiperPrerView = 3;
    initialWidthViewerSwiper = 340;

  }

  return {
    getUpdatedSwiperConfig(amountViewerSlides) {
      conditionViewerSlides = amountViewerSlides >= viewerSwiperPrerView;
      actualSwiperWidth = conditionViewerSlides ? initialWidthViewerSwiper : amountViewerSlides * widthViewerSlide;
      return { swiperWidth: actualSwiperWidth, conditionViewerSlides };
    },
    getSlidesPerView(amountViewerSlides) {
      return conditionViewerSlides ? viewerSwiperPrerView : amountViewerSlides;
    }
  };
}
