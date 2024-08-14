import { handleViewPanorama } from '@/modal360/components/viewer/handle_viewer_panorama';
import { toggleClassName } from 'utils';
import { toggleClassToAlter } from '@/modal360/components/alter_parent_window';

export function click(viewerInstance) {
  const viewerSlideExt = document.querySelector(".swiper-slide.ext");
  const viewerSlideInt = document.querySelector(".swiper-slide.int");
  const initialActiveSlide = viewerSlideExt ? viewerSlideExt : viewerSlideInt;

  const setViewPanorama = handleViewPanorama(viewerInstance);

  setViewPanorama(initialActiveSlide);
  document.addEventListener("click", function (e) {
    const target = e.target;
    if (target.closest('.swiper-slide')) {
      setViewPanorama(target.closest('.swiper-slide'));
    }

    if (target.closest('.viewer__fake-fullscreen')) {
      handleFakeFullscreen(target.closest('.viewer__fake-fullscreen'));
    }
  });
};

function handleFakeFullscreen(el) {
  toggleClassName(document.body, 'fake-fullscreen-active');
  toggleClassToAlter();
}