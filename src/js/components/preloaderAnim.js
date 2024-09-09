export function mediaLoading() {
  let animatePreloader = getAnimatePreloaderFn();
  function getAnimatePreloaderFn() {
    // const preloaderProgressbar = document.querySelector('.preloader__progressbar');
    const preloaderTotal = document.querySelector('.preloader__total span');
    const preloaderMap = document.querySelector('.preloader__map');
    const preloaderLogo = document.querySelector('.preloader__logo-loading');
    let path;
    let mapProgress;

    if (preloaderTotal) {
      return function animatePreloader(value) {
        path = value * 100;
        mapProgress = (4000 * path) / 100;
        preloaderTotal.innerHTML = Math.floor(path);
        preloaderMap.style.strokeDashoffset = 4000 - mapProgress;
        preloaderLogo.style.width = `${path}%`;
      };
    } else {
      return function animatePreloader(value) {
        console.log(value);
      };
    }
  }
  window.addEventListener('media-loading', (e) => {
    animatePreloader(e.detail.progress);
    if (e.detail.progress == 1) {
      setTimeout(() => {
        e.detail.progress = 0;
      }, 500);
    }
  });
}
