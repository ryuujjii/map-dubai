import { removeClassName, addClassName } from 'utils';
import viewerInstance from '@/modal360/components/viewer/viewerInstance';


export function getSetPanoramaFn(viewer) {
  let activeSlide = null;
  let isLoaderOpenning = true;
  let loaderActiveChecker = null;
  window.addEventListener("loader-shown", (e) => {
    isLoaderOpenning = false;
  });
  return function setPanorama(el) {
    const src = el.getAttribute('data-src');
    if (activeSlide) {
      removeClassName(activeSlide, 'active');
    }
    addClassName(el, 'active');
    viewer.setPanorama(src).finally((e) => {
      if (!isLoaderOpenning) {
        addClassName(window.parent.document.documentElement, 'preloader-hidden');
        isLoaderOpenning = true;
      } else {
        clearInterval(loaderActiveChecker);
        loaderActiveChecker = setInterval(() => {
          if (!isLoaderOpenning) {
            clearInterval(loaderActiveChecker);
            addClassName(window.parent.document.documentElement, 'preloader-hidden');
            isLoaderOpenning = true;
          }
        }, 1000);
      }
    });
    activeSlide = el;
  };
}

const setPanorama = getSetPanoramaFn(viewerInstance);

export default setPanorama;