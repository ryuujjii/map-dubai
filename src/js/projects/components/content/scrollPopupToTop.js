import { addClassName, removeClassName } from 'utils';
function getScrollPopupToTopFn() {
  const popupsWp = document.querySelectorAll('[data-popup] .popup__wp');

  return function scrollPopupToTop() {
    popupsWp.forEach(popupWp => {
      !hasScrollingElement(popupWp) ? addClassName(popupWp.parentElement, 'hide-scroll-down') : removeClassName(popupWp.parentElement, 'hide-scroll-down');
      gsap.to(popupWp, {
        scrollTo: {
          y: 0
        }
      });
    });
  };
}

const scrollPopupToTop = getScrollPopupToTopFn();
export default scrollPopupToTop;


function hasScrollingElement(parent) {
  return Math.abs(parent.scrollHeight - parent.clientHeight) > 10;
}