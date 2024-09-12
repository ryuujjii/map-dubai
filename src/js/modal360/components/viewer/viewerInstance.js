import { queryMatches } from "utils";
import { Viewer } from "@photo-sphere-viewer/core";
import { GyroscopePlugin } from "@photo-sphere-viewer/gyroscope-plugin";
/**
 * viewer initialization
 */
const IS_IPADE = queryMatches(1170);

const viewerInstance = new Viewer({
  container: document.querySelector(".viewer__wrapper"),
  defaultZoomLvl: 0,
  navbar: [
    {
      id: "custom-gyroscope",
      className: "custom-gyro-btn",
      onClick: () => toggleGyroscope(),
    },
    !IS_IPADE ? "zoom" : "",
    "caption",
    "fullscreen",
  ],
  minFov: 60,
  posePitch: 2,
  plugins: [GyroscopePlugin],
});

let isGyroscopeEnabled = false;

function toggleGyroscope() {
  const gyroscopePlugin = viewerInstance.getPlugin(GyroscopePlugin);

  if (isGyroscopeEnabled) {
    gyroscopePlugin.stop();
    isGyroscopeEnabled = false;
  } else {
    gyroscopePlugin.start();
    isGyroscopeEnabled = true;
  }
}
export default viewerInstance;
