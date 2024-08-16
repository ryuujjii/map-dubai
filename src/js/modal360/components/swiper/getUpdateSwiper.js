export function getUpdateSwiper(getUpdatedSwiperConfig, getSlidesPerView, swiper) {
  const viewerSwiper = document.querySelector(".viewer__swiper");

  return function updateSwiper(slidesLength) {
    const { swiperWidth } = getUpdatedSwiperConfig(slidesLength);
    swiper.params.slidesPerView = getSlidesPerView(slidesLength);
    viewerSwiper.style.cssText =
      `width:${swiperWidth}px;`;
    swiper.update();
  };
}