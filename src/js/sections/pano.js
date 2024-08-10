import { addClassName, removeClassName } from 'utils';

export default function pano() {
  const btns = document.querySelectorAll('[data-modal-open]');

  const modalIframe = document.querySelector(".pano__iframe");
  btns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      modalIframe.innerHTML = `<iframe src="${btn.getAttribute('data-modal-open')}" style="" frameborder="0"></iframe>`;
      addClassName(document.body, 'open-pano');
    });
  });
  window.addEventListener('close-pano', (e) => {
    removeClassName(document.body, 'open-pano');
  });
};
