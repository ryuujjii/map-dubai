import { dispatchCustomEvent, removeClassName, addClassName } from 'utils';
export default function testBtns() {
  const btns = document.querySelectorAll('[data-test]');
  btns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      removeClassName(document.documentElement, 'preloader-hidden');
      setTimeout(() => {
        dispatchCustomEvent({ el: window, event: "show-project", detail: { projectId: btn.getAttribute("data-test") } });
        setTimeout(() => {
          addClassName(document.documentElement, 'preloader-hidden');
        }, 1000);
      }, 1000);
    });
  });
};
