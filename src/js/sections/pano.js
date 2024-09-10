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
  let isPanoLoaded = false;
  btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      dispatchCustomEvent({
        el: window,
        event: 'node-change',
        detail: { projectId: btn.getAttribute('data-modal-logo') },
      });
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
