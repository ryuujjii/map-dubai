import { addClassName, removeClassName } from 'utils';

function getCenterMap() {
  const masterplanWrapper = document.querySelector('.masterplan__wrapper');
  const masterplanMedia = document.querySelector('.masterplan__media');
  return function centerImg(centerPosotion) {
    const containerWidth = masterplanMedia.offsetWidth;
    // removeClassName(masterplanWrapper, 'no-scroll');
    let res = Math.abs(containerWidth / 2 - window.innerWidth / 2 - containerWidth * centerPosotion);
    gsap.to(masterplanWrapper, {
      scrollTo: {
        x: 0
      },
      onComplete: () => {
        gsap.to(masterplanWrapper, {
          scrollTo: {
            x: res
          },
          onComplete() {
            // addClassName(masterplanWrapper, 'no-scroll');
          }
        });
      }
    });
  };
}

const centerMap = getCenterMap();

export default centerMap;