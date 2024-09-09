import imgLoader from '@/projects/components/content/imgLoader';
import { getProjectItem } from '@/projects/components/content/utils';
import centerMap from '@/projects/components/content/map/centerMap';
function getSetMapFn() {
  const mapEls = {
    // map: getProjectItem('map'),
    mapShadow: getProjectItem('map-shadow'),
    mapParent: document.querySelector('.masterplan__draggable'),
  };


  imgLoader(mapEls.mapShadow/* , mapEls.map */);
  
  return function ({ shadow, img, centerPosotion, styles, hoverShadows }) {
    // mapEls.map.setAttribute('src', img);
    mapEls.mapParent.style.cssText = styles;
    mapEls.mapShadow.setAttribute('src', shadow);
    centerMap(centerPosotion);
  };
}

const setMap = getSetMapFn();

export default setMap;

