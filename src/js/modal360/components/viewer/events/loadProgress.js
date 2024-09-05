// load-progress
import { dispatchCustomEvent } from 'utils';
export default function loadProgress(viewerInstance) {
  const parentWindow = window.parent
  let isModal360Loaded = false;
  
  parentWindow.addEventListener('close-modal360', (e) => {
    isModal360Loaded = false;
  });
  
  viewerInstance.addEventListener('load-progress', (e) => {
    if (isModal360Loaded) return;
    if (e.progress === 100) {
      isModal360Loaded = true;
    }
    dispatchCustomEvent({
      el: parentWindow,
      event: "media-loading",
      detail: { progress: e.progress / 100 }
    });
  });
};
