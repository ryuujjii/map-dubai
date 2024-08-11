import { addClassName, removeClassName, insertIframe } from 'utils';
import collectEscEls from '@/components/esc/collectEscEls';
import removeLastEscEl from '@/components/esc/removeLastEscEl';

export default function modal360() {
  const modal360 = document.querySelectorAll('[data-modal360]');
  const modalIframe = document.querySelector(".modal360__iframe");

  modal360.forEach(btn => {
    btn.addEventListener("click", (e) => {
      insertIframe(modalIframe, btn.getAttribute('data-modal360'));
      addClassName(document.body, 'open-modal360');
      collectEscEls('close-modal360');
    });
  });

  window.addEventListener('close-modal360', (e) => {
    removeClassName(document.body, 'open-modal360');
    removeLastEscEl('close-modal360');
  });
};
