import { addClassName, removeClassName } from 'utils';

function getCenterMap() {
  const masterplanWrapper = document.querySelector('.masterplan__wrapper');
  const masterplanMedia = document.querySelector('.masterplan__media');
  return function centerImg(centerPosotion) {
    const containerWidth = masterplanMedia.offsetWidth;
    const containerHeight = masterplanMedia.offsetHeight;
    removeClassName(masterplanWrapper, 'no-scroll');
    let x = calculateNewPos(window.innerWidth, containerWidth, centerPosotion.x);
    let y = calculateNewPos(window.innerHeight, containerHeight, centerPosotion.y);
    gsap.to(masterplanWrapper, {
      scrollTo: {
        x: 0
      },
      onComplete: () => {
        gsap.to(masterplanWrapper, {
          scrollTo: {
            x,
            y
          },
          onComplete() {
            addClassName(masterplanWrapper, 'no-scroll');
          }
        });
      }
    });
  };
}
function calculateNewPos(parentSize, mediaSize, offset) {
  return Math.abs(mediaSize / 2 - parentSize / 2 - mediaSize * offset);
}
const centerMap = getCenterMap();

export default centerMap;