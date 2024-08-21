import imgLoader from '@/projects/components/content/imgLoader';
function getSetMapFn() {
  const map = document.querySelector('[data-project="map"]');
  const mapShadow = document.querySelector('[data-project="map-shadow"]');
  imgLoader(map, mapShadow);
  return function ({ shadow, img, centerPosotion }) {
    map.setAttribute('src', img);
    mapShadow.setAttribute('src', shadow);
    centerImg(centerPosotion);
  };
}

const setMap = getSetMapFn();

export default setMap;

function centerImg(centerPosotion) {
  const containerWidth = document.querySelector('.masterplan__media').offsetWidth;
  let res = Math.abs(containerWidth / 2 - window.innerWidth / 2 - containerWidth * centerPosotion);
  gsap.to('.masterplan__wrapper', {
    scrollTo: {
      x: 0
    },
    onComplete: () => {
      gsap.to('.masterplan__wrapper', {
        scrollTo: {
          x: res
        }
      });
    }
  });
}