import { addClassName, removeClassName } from 'utils';
export default function modal360() {
  const modal360 = document.querySelectorAll('[data-modal360]');
  const modalIframe = document.querySelector(".modal360__iframe");

  modal360.forEach(btn => {
    btn.addEventListener("click", (e) => {
      modalIframe.innerHTML = `<iframe src="${btn.getAttribute('data-modal360')}" style="" frameborder="0"></iframe>`;
      addClassName(document.body, 'open-modal360');
    });
  });

  window.addEventListener('close-modal360', (e) => {
    removeClassName(document.body, 'open-modal360');
  });
};
