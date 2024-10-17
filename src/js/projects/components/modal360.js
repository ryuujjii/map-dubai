import { addClassName, removeClassName, dispatchCustomEvent, insertIframe } from 'utils';
import collectEscEls from '@/components/esc/collectEscEls';
import removeLastEscEl from '@/components/esc/removeLastEscEl';
import { sendMediaToModal360, sendFloorplanToModal360, iframeWindow } from '@/projects/components/content/getDataToModal360';

export default function modal360() {
  let modal360Btns = null;
  let activePano = "";
  const panoIframe = document.querySelector('.pano__iframe');

  window.addEventListener('close-modal360', (e) => {
    removeClassName(document.body, 'open-modal360');
    removeLastEscEl('close-modal360');
    insertIframe(panoIframe, `files/pano/${activePano}`);
  });

  window.addEventListener('node-change', (e) => {
    activePano = e.detail.panoNode ?? "";
  });

  window.addEventListener('dots-painted', (e) => {
    modal360Btns = document.querySelectorAll('[data-modal360]');
    modal360Btns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        panoIframe.innerHTML = "";
        removeClassName(document.documentElement, 'preloader-hidden');
        sendMediaToModal360(btn.getAttribute('data-modal360'));
        sendFloorplanToModal360(btn.getAttribute('data-modal360'));
        setTimeout(() => {
          dispatchCustomEvent({
            el: iframeWindow.contentWindow, event: "loader-shown"
          });
          addClassName(document.body, 'open-modal360');
          collectEscEls('close-modal360');
        }, 1000);
      });
    });
  });
};

