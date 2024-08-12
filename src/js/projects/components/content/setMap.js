function getSetMapFn() {
  const map = document.querySelector('[data-project="map"]');
  const mapShadow = document.querySelector('[data-project="map-shadow"]');

  return function ({ shadow, img }) {
    map.setAttribute('src', img);
    mapShadow.setAttribute('src', shadow);
  };
}

const setMap = getSetMapFn();

export default setMap;