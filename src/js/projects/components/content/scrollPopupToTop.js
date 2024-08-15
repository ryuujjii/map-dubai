function getScrollPopupToTopFn() {
  const popupsWp = document.querySelectorAll('[data-popup] .popup__wp');

  return function scrollPopupToTop() {
    popupsWp.forEach(popupWp => gsap.to(popupWp, {
      scrollTo: {
        y: 0
      }
    }));
  };
}

const scrollPopupToTop = getScrollPopupToTopFn();
export default scrollPopupToTop;
