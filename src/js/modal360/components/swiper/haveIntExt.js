import { addClassName, removeClassName } from 'utils';

function getHaveIntExtFn() {
  const viewerIntExtBtn = document.querySelector(".viewer-btn-int-ext");
  const viewer = document.querySelector(".viewer");

  return function haveIntExt() {
    resetClasses();
    const viewerInt = document.querySelectorAll(".swiper-slide.int");
    const viewerExt = document.querySelectorAll(".swiper-slide.ext");
    if (viewerInt.length === 0) {
      addClassName(viewerIntExtBtn, "none");
      addClassName(viewer, "active-ext-slides");
      removeClassName(viewer, 'active-int-slides');
    }
    if (viewerExt.length === 0) {
      addClassName(viewerIntExtBtn, "none");
      removeClassName(viewer, "active-ext-slides");
      addClassName(viewer, 'active-int-slides');
    }

    function resetClasses() {
      addClassName(viewer, "active-ext-slides");
      removeClassName(viewerIntExtBtn, "none");
      removeClassName(viewer, 'active-int-slides');
    }
  };
}

const haveIntExt = getHaveIntExtFn();

export { haveIntExt };