import { addClassName, removeClassName, insertIframe } from 'utils';
import collectEscEls from '@/components/esc/collectEscEls';
import removeLastEscEl from '@/components/esc/removeLastEscEl';

export default function modal360() {
  const modalIframe = document.querySelector(".modal360__iframe");
  let modal360Btns = null;

  window.addEventListener('close-modal360', (e) => {
    removeClassName(document.body, 'open-modal360');
    removeLastEscEl('close-modal360');
  });

  window.addEventListener('dots-painted', (e) => {
    modal360Btns = document.querySelectorAll('[data-modal360]');
    modal360Btns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        insertIframe(modalIframe, btn.getAttribute('data-modal360'));
        addClassName(document.body, 'open-modal360');
        collectEscEls('close-modal360');
      });
    });
  });
};
