import { addClassName, removeClassName, dispatchCustomEvent } from 'utils';
import collectEscEls from '@/components/esc/collectEscEls';
import removeLastEscEl from '@/components/esc/removeLastEscEl';
import { sendDataToModal360, iframeWindow } from '@/projects/components/content/getDataToModal360';

export default function modal360() {
  let modal360Btns = null;
  window.addEventListener('close-modal360', (e) => {
    removeClassName(document.body, 'open-modal360');
    removeLastEscEl('close-modal360');
  });

  window.addEventListener('dots-painted', (e) => {
    modal360Btns = document.querySelectorAll('[data-modal360]');
    modal360Btns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        removeClassName(document.documentElement, 'preloader-hidden');
        sendDataToModal360(btn.getAttribute('data-modal360'));
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
