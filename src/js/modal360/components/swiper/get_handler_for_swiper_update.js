export function getHandlerForSwiperUpdate(getSwiperWidthAndCount, getSwiperPerView, swiper) {
  return function setSwiperSLidesLenght(intLength, extLength) {
    return function (isActiveExt) {
      const viewerSwiper = document.querySelector(".viewer__swiper");
      const slidesLength = isActiveExt ? intLength : extLength;
      const { conditionViewerSlides, swiperWidth } = getSwiperWidthAndCount(slidesLength);
      swiper.params.slidesPerView = getSwiperPerView(conditionViewerSlides, slidesLength);
      viewerSwiper.style.cssText =
        `width:${swiperWidth}px;`;
    };
  };
}