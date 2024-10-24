
import "latest-createjs/lib/preloadjs/preloadjs.js";
import { dispatchCustomEvent } from "utils"

function getLoadMediaFn() {
  const arrOfBlobs = [];

  return function (medias) {
    const queue = new createjs.LoadQueue();
    const mediasArr = Object.entries(medias);
    return new Promise((resolve, reject) => {
      queue.on("complete", () => {
        const urls = mediasArr.reduce((acc, media) => {
          const item = URL.createObjectURL(queue.getResult(media[0], true));
          acc[media[0]] = item;
          arrOfBlobs.push(item);
          return acc;
        }, {});
        resolve(urls);
      });
      queue.on("error", (error) => {
        reject(error);
      });
      queue.on("progress", (e) => {
        updateLoader(e.loaded);
      });
      queue.loadManifest(getMediaToLoad(mediasArr));
    });
  };
};

function getMediaToLoad(medias) {
  return medias.reduce((acc, el) => {
    acc.push({
      id: el[0],
      src: el[1],
      type: createjs.Types.IMAGE,
    });
    return acc;
  }, []);
}
function updateLoader(progress) {
  dispatchCustomEvent({ el: window, event: "floorplan-progress", detail: { totalProgress: progress } })
}

const loadMedia = getLoadMediaFn();
export default loadMedia;