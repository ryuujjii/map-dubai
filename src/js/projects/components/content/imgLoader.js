import { dispatchCustomEvent } from 'utils';

function getImgLoader() {
  const media = [];
  let counter = 0;


  function loaderCallBack(e) {
    counter++;
    dispatchCustomEvent({
      el: window,
      event: "media-loading",
      detail: { progress: +(counter / media.length).toFixed(2) }
    });
    if (counter === media.length) {
      dispatchCustomEvent({ el: window, event: "project-media-loaded" });
      counter = 0;
    }
  }
  function removeItemFromLoader(...els) {
    els.forEach(el => {
      media.splice(media.indexOf(el), 1);
    });
    console.log(media);
  }
  function imgLoader(...els) {
    media.push(...els);
    els.forEach(el => {
      el.addEventListener("load", loaderCallBack);
      el.addEventListener("error", loaderCallBack);
    });
  }
  return [imgLoader, removeItemFromLoader];
};



const [imgLoader, removeItemFromLoader] = getImgLoader();
export default imgLoader;
export { removeItemFromLoader };