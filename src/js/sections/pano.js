import { addClassName, removeClassName, insertIframe } from 'utils';

export default function pano() {
  const btns = document.querySelectorAll('[data-modal-open]');
  const modalIframe = document.querySelector(".pano__iframe");
  
  btns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      insertIframe(modalIframe, btn.getAttribute('data-modal-open'));
      addClassName(document.body, 'open-pano');
    });
  });
  window.addEventListener('close-pano', (e) => {
    removeClassName(document.body, 'open-pano');
  });
};
