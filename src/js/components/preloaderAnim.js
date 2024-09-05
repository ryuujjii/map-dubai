export function mediaLoading() {
  let animatePreloader = getAnimatePreloaderFn();
  function getAnimatePreloaderFn() {
    // const preloaderProgressbar = document.querySelector('.preloader__progressbar');
    const preloaderTotal = document.querySelector('.preloader__total span');
    if (preloaderTotal) {
      return function animatePreloader(value) {
        let path = value * 100;
        preloaderTotal.innerHTML = Math.floor(path);
      };
    } else {
      return function animatePreloader(value) {
        console.log(value);
      };
    }
  }
  window.addEventListener('media-loading', (e) => {
    animatePreloader(e.detail.progress);
    setTimeout(() => {
      if (e.detail.progress == 1) {
        e.detail.progress = 0;
      }
    }, 500);
  });
}
