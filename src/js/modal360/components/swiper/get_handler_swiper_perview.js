export function getHandlerSwiperPerView(viewerSwiperPrerView) {
  return function (conditionViewerSlides, amountViewerSlides) {
    return conditionViewerSlides ? viewerSwiperPrerView : amountViewerSlides;
  };
}