import imgLoader from '@/projects/components/content/imgLoader';
import { addClassName, removeClassName } from 'utils';
import { getProjectItem } from '@/projects/components/content/utils';

function getSetMapFn() {
  const mapEls = {
    // map: getProjectItem('map'),
    mapShadow: getProjectItem('map-shadow'),
    mapParent: document.querySelector('.masterplan__draggable'),
  };

  const centerImg = getCenterImg();
  imgLoader(mapEls.mapShadow/* , mapEls.map */);
  
  return function ({ shadow, img, centerPosotion, styles }) {
    // mapEls.map.setAttribute('src', img);
    mapEls.mapParent.style.cssText = styles;
    mapEls.mapShadow.setAttribute('src', shadow);
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