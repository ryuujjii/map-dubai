import { addClassName, removeClassName, queryMatches } from 'utils';
export function getUpdateSwiper(getUpdatedSwiperConfig, getSlidesPerView, swiper) {
  const viewerNav = document.querySelector(".viewer__nav");


  return function updateSwiper(slidesLength) {
    const { swiperWidth } = getUpdatedSwiperConfig(slidesLength);
    swiper.params.slidesPerView = getSlidesPerView(slidesLength);
    if (!queryMatches(1200)) {
      slidesLength > 5 ? addClassName(viewerNav, "show-pagination") : removeClassName(viewerNav, "show-pagination")
    }else {
      slidesLength > 3 ? addClassName(viewerNav, "show-pagination") : removeClassName(viewerNav, "show-pagination")
    }
    viewerNav.style.setProperty('--swiperSize', `${swiperWidth}px`);
    // viewerSwiper.style.cssText =
    //   `height:${swiperWidth}px;`;
    swiper.update();
  };
}