import { removeClassName, addClassName, dispatchCustomEvent } from 'utils';
import viewerInstance from '@/modal360/components/viewer/viewerInstance';


export function getSetPanoramaFn(viewer) {
  let activeSlide = null;
  let isLoaderOpenning = true;
  let loaderActiveChecker = null;
  let needFinally = true;
  window.addEventListener("loader-shown", (e) => {
    isLoaderOpenning = false;
  });
  window.addEventListener("change-needFinally", (e) => {
    needFinally = e.detail.needFinally;
  });
  return function setPanorama(el) {
    const src = el.getAttribute('data-src');
    if (activeSlide) {
      removeClassName(activeSlide, 'active');
    }
    addClassName(el, 'active');
    viewer.setPanorama(src).finally((e) => {
      if (!needFinally) return;
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
      dispatchCustomEvent({
        el: window, event: "change-needFinally", detail: {
          needFinally: false
        }
      });
    });
    activeSlide = el;
  };
}

const setPanorama = getSetPanoramaFn(viewerInstance);

export default setPanorama;