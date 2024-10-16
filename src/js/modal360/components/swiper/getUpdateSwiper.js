import {  queryMatches } from 'utils';
export function getUpdateSwiper(getUpdatedSwiperConfig, getSlidesPerView, paginationVisibilite, swiper) {
  const viewerNav = document.querySelector(".viewer__nav");


  return function updateSwiper(slidesLength) {
    const { swiperWidth } = getUpdatedSwiperConfig(slidesLength);
    swiper.params.slidesPerView = getSlidesPerView(slidesLength);
    paginationVisibilite(viewerNav, slidesLength)
    viewerNav.style.setProperty('--swiperSize', `${swiperWidth}px`);
    swiper.update();
  };
}