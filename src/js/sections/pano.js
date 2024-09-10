import {
  addClassName,
  removeClassName,
  insertIframe,
  dispatchCustomEvent,
} from 'utils';
import collectEscEls from '@/components/esc/collectEscEls';
import removeLastEscEl from '@/components/esc/removeLastEscEl';
import testBtns from '@/components/testBtns';
export default function pano(data) {
  const btns = document.querySelectorAll('[data-modal-open]');
  const modalIframe = document.querySelector('.pano__iframe');
  const preloaderVal = document.querySelector('.preloader');
  const preloaderLogoImg = document.querySelector('.preloader__logo-img img');
  const preloaderLoadingImg = document.querySelector(
    '.preloader__logo-loading img'
  );
  const projects = data.reduce((acc, el) => {
    acc[el.dataTestName] = {
      projectLogo: el.projectLogo,
    };
    return acc ;
  }, {});
  let isPanoLoaded = false;
  btns.forEach((btn) => {
    const dataModalLogo = btn.getAttribute('data-modal-logo')
    btn.addEventListener('click', (e) => {
      preloaderVal.classList.add('in-project');
      preloaderLogoImg.src = projects[dataModalLogo].projectLogo.stroke;
      preloaderLoadingImg.src = projects[dataModalLogo].projectLogo.fill;
      removeClassName(document.documentElement, 'preloader-hidden');
      setTimeout(() => {
        insertIframe(modalIframe, btn.getAttribute('data-modal-open'));
        addClassName(document.body, 'open-pano');
        collectEscEls('close-pano');
      }, 1000);
    });
  });
  if (__SHOWPANO__) {
    // window.addEventListener("pano-loaded", (e) => {
    //   console.log("pano-loaded");
    //   if (isPanoLoaded) return;
    //   isPanoLoaded = true;
    //   setTimeout(() => {
    //     addClassName(document.documentElement, 'preloader-hidden');
    //   }, 1000);
    // });
    window.addEventListener('pano-loading', (e) => {
      if (isPanoLoaded) return;
      if (e.detail.progress.percentLoaded === 1) {
        isPanoLoaded = true;
        setTimeout(() => {
          addClassName(document.documentElement, 'preloader-hidden');
        }, 1000);
      }
      dispatchCustomEvent({
        el: window,
        event: 'media-loading',
        detail: { progress: e.detail.progress.percentLoaded },
      });
    });
  } else {
    testBtns();
  }
  window.addEventListener('close-pano', (e) => {
    removeClassName(document.body, 'open-pano');
    removeLastEscEl('close-pano');
    isPanoLoaded = false;
  });
}
