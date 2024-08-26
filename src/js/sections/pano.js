import { addClassName, removeClassName, insertIframe } from 'utils';
import collectEscEls from '@/components/esc/collectEscEls';
import removeLastEscEl from '@/components/esc/removeLastEscEl';
import testBtns from "@/components/testBtns";

export default function pano() {
  const btns = document.querySelectorAll('[data-modal-open]');
  const modalIframe = document.querySelector(".pano__iframe");
  let isPanoLoaded = false;
  btns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      removeClassName(document.documentElement, 'preloader-hidden');
      setTimeout(() => {
        insertIframe(modalIframe, btn.getAttribute('data-modal-open'));
        addClassName(document.body, 'open-pano');
        collectEscEls('close-pano');
      }, 1000);
    });
  });
  if (__SHOWPANO__) {
    window.addEventListener("pano-loaded", (e) => {
      if (isPanoLoaded) return;
      isPanoLoaded = true;
      setTimeout(() => {
        addClassName(document.documentElement, 'preloader-hidden');
      }, 1000);
    });
  } else {
    testBtns();
  }
  window.addEventListener('close-pano', (e) => {
    removeClassName(document.body, 'open-pano');
    removeLastEscEl('close-pano');
    isPanoLoaded = false;
  });
};


