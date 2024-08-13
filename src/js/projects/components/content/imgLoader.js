function getImgLoader() {
  const media = [];
  let counter = 0;


  function loaderCallBack(e) {
    counter++;
    if (counter === media.length) {
      counter = 0;
    }
  }
  return function imgLoader(...els) {
    media.push(...els);
    els.forEach(el => {
      el.addEventListener("load", loaderCallBack);
      el.addEventListener("error", loaderCallBack);
    });
  };
};



const imgLoader = getImgLoader();
export default imgLoader;