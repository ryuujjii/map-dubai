import { config } from '@/modal360/components/swiper/config';
import { getUpdateSwiper } from '@/modal360/components/swiper/getUpdateSwiper';
import { swiperInstance } from '@/modal360/components/swiper/swiperIstance.js';
import setPanorama from '@/modal360/components/viewer/setPanorama.js';

function getViewerSwiper() {
  let viewerSlides;
  const { getUpdatedSwiperConfig, getSlidesPerView, paginationVisibilite } = config();

  return function viewerSwiper() {
    viewerSlides = document.querySelectorAll(".swiper-slide.int");
    const updateSwiper = getUpdateSwiper(getUpdatedSwiperConfig, getSlidesPerView, paginationVisibilite, swiperInstance);
    setPanorama(viewerSlides[0]);
    updateSwiper(viewerSlides.length);
  };
}

const viewerSwiper = getViewerSwiper();

export { viewerSwiper };