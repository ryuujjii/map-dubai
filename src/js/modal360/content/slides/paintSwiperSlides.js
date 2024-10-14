import slideLayout from '@/modal360/content/slides/slideLayout';
import { dispatchCustomEvent, addClassName, removeClassName } from 'utils';
function getPaintSwiperSlides() {
  const slidesParent = document.querySelector('.swiper-wrapper');
  function paintHelper(type, data) {
    const { img360, img360Preview } = data;
    img360.forEach((el, i) => {
      slidesParent.innerHTML += slideLayout(type, el, img360Preview[i]);
    });
  }
  return function paintSwiperSlides(content) {
    slidesParent.innerHTML = "";
    const { exteriors, interiors } = content;
    interiors.img360.length > 1 ? removeClassName(document.body, "hide-swiper") : addClassName(document.body, "hide-swiper");
    // paintHelper('exteriors', exteriors);
    paintHelper('interiors', interiors);
    dispatchCustomEvent({ el: window, event: "slides-painted" });
  };
}

const paintSwiperSlides = getPaintSwiperSlides();

export default paintSwiperSlides;