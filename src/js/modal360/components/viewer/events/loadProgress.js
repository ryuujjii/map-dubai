// load-progress
import { dispatchCustomEvent } from "utils";
import { setPanoLoader } from "@/modal360/components/viewer/setPanoLoader";
export default function loadProgress(viewerInstance) {
  const parentWindow = window.parent;
  let isModal360Loaded = false;
  const viewerLoaderLine = document.querySelector(".viewer__loader-line");
  const viewerLoader = document.querySelector(".viewer__loader");
  parentWindow.addEventListener("close-modal360", (e) => {
    isModal360Loaded = false;
  });

  viewerInstance.addEventListener("load-progress", (e) => {
    setPanoLoader(e.progress, viewerLoaderLine, viewerLoader);
    if (isModal360Loaded) return;
    // console.log("modal360 progress:", e.progress);
    if (e.progress === 100) {
      // console.log("modal360 progress:", "ready to go");
      isModal360Loaded = true;
      viewerLoader.classList.add("ready");
    }
    dispatchCustomEvent({
      el: parentWindow,
      event: "media-loading",
      detail: { progress: e.progress / 100 },
    });
  });
}
