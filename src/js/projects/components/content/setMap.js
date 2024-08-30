import imgLoader from '@/projects/components/content/imgLoader';
import { addClassName, removeClassName } from 'utils';


function getSetMapFn() {
  // const map = document.querySelector('[data-project="map"]');
  const mapShadow = document.querySelector('[data-project="map-shadow"]');
  const centerImg = getCenterImg();
  imgLoader(mapShadow/* , map */);
  return function ({ shadow, img, centerPosotion }) {
    // map.setAttribute('src', img);
    mapShadow.setAttribute('src', shadow);
    centerImg(centerPosotion);
  };
}

const setMap = getSetMapFn();

export default setMap;

function getCenterImg() {
  const masterplanWrapper = document.querySelector('.masterplan__wrapper');
  const masterplanMedia = document.querySelector('.masterplan__media');
  return function centerImg(centerPosotion) {
    const containerWidth = masterplanMedia.offsetWidth;
    removeClassName(masterplanWrapper, 'no-scroll');
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
            addClassName(masterplanWrapper, 'no-scroll');
          }
        });
      }
    });
  };
}