import { removeClassName, addClassName } from 'utils';
import  viewerInstance  from '@/modal360/components/viewer/viewerInstance';


export function getSetPanoramaFn(viewer) {
  let activeSlide = null;
  return function setPanorama(el) {
    const src = el.getAttribute('data-src');
    if (activeSlide) {
      removeClassName(activeSlide, 'active');
    }
    addClassName(el, 'active');
    viewer.setPanorama(src);
    activeSlide = el;
  };
}

const setPanorama = getSetPanoramaFn(viewerInstance);

export default setPanorama;