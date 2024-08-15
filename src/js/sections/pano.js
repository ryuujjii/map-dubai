import { addClassName, removeClassName, insertIframe } from 'utils';
import collectEscEls from '@/components/esc/collectEscEls';
import removeLastEscEl from '@/components/esc/removeLastEscEl';
import testBtns from "@/components/testBtns";

export default function pano() {
  const btns = document.querySelectorAll('[data-modal-open]');
  const modalIframe = document.querySelector(".pano__iframe");

  btns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      insertIframe(modalIframe, btn.getAttribute('data-modal-open'));
      addClassName(document.body, 'open-pano');
      collectEscEls('close-pano');
    });
  });
  testBtns();
  window.addEventListener('close-pano', (e) => {
    removeClassName(document.body, 'open-pano');
    removeLastEscEl('close-pano');
  });
};


