import { addClassName, removeClassName } from 'utils';
import collectEscEls from '@/components/esc/collectEscEls';
import removeLastEscEl from '@/components/esc/removeLastEscEl';
import { sendDataToModal360 } from '@/projects/components/content/getDataToModal360';

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
        addClassName(document.body, 'open-modal360');
        sendDataToModal360(btn.getAttribute('data-modal360'));
        collectEscEls('close-modal360');
      });
    });
  });
};
