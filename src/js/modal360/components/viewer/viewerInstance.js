import { queryMatches } from 'utils';
import { Viewer, Cache } from '@photo-sphere-viewer/core';
import { GyroscopePlugin } from '@photo-sphere-viewer/gyroscope-plugin';
/**
   * viewer initialization
   */
const IS_IPADE = queryMatches(1170);

Cache.enabled = false;
const viewerInstance = new Viewer({
  plugins: [GyroscopePlugin],
  container: document.querySelector(".viewer__wrapper"),
  defaultZoomLvl: 0,
  navbar: ["zoom", !IS_IPADE ? "" : "gyroscope", "caption", "fullscreen"],
  minFov: 60,
  posePitch: 2,
});

export default viewerInstance;