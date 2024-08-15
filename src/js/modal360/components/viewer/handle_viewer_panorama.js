import { removeClassName, addClassName } from 'utils';

export function handleViewPanorama(viewer) {
  if (!handleViewPanorama.prevActive) {
    handleViewPanorama.prevActive = null;
  }
  return function (el) {
    const src = el.getAttribute('data-src');
    if (handleViewPanorama.prevActive) {
      removeClassName(handleViewPanorama.prevActive, 'active');
    }
    addClassName(el, 'active');
    viewer.setPanorama(src);
    handleViewPanorama.prevActive = el;
  };
}