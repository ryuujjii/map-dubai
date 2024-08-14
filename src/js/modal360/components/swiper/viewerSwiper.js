import { handleViewPanorama } from '@/modal360/components/viewer/handle_viewer_panorama.js';
import { viewerInstance } from '@/modal360/components/viewer/viewer_instance.js';
import { config } from '@/modal360/components/swiper/config';
import { swiperInstance } from '@/modal360/components/swiper/swiper_instance.js';
import { getAmountViewerSlides } from '@/modal360/components/swiper/get_amount_viewer_slides.js';
import { getHandlerSwiperPerView } from '@/modal360/components/swiper/get_handler_swiper_perview.js';
import { getHandlerForSwiperUpdate } from '@/modal360/components/swiper/get_handler_for_swiper_update.js';
import { addClassName, removeClassName } from 'utils';

export function viewerSwiper() {
  const viewerSlidesExt = document.querySelectorAll(".swiper-slide.ext");
  const viewerSlidesInt = document.querySelectorAll(".swiper-slide.int");
  const amountViewerSlides = getAmountViewerSlides(viewerSlidesExt.length, viewerSlidesExt.length);
  const viewer = document.querySelector(".viewer");
  let isActiveExt = true;

  const { viewerSwiperPrerView, getSwiperWidthAndCount } = config(amountViewerSlides);
  const getSwiperPerView = getHandlerSwiperPerView(viewerSwiperPrerView);
  const setSwiperSLidesLenght = getHandlerForSwiperUpdate(getSwiperWidthAndCount, getSwiperPerView, swiperInstance);
  const setSwiperWidthOnUpdate = setSwiperSLidesLenght(viewerSlidesInt.length, viewerSlidesExt.length);
  setSwiperWidthOnUpdate(!(viewerSlidesExt.length > 0));

  const setViewPanorama = handleViewPanorama(viewerInstance);
  document.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(".viewer__btn-swap")) {
      setSwiperWidthOnUpdate(isActiveExt);
      if (isActiveExt) {
        removeClassName(viewer, "active-ext-slides");
        addClassName(viewer, "active-int-slides");
        isActiveExt = false;
        setViewPanorama(viewerSlidesInt[0]);
      } else {
        addClassName(viewer, "active-ext-slides");
        removeClassName(viewer, "active-int-slides");
        isActiveExt = true;
        setViewPanorama(viewerSlidesExt[0]);
      }
      swiperInstance.update();
    }
  });
}
