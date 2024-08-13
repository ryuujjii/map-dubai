import { dispatchCustomEvent } from 'utils';
export default function testBtns() {
  const btns = document.querySelectorAll('[data-test]');
  btns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      dispatchCustomEvent({ el: window, event: "show-project", detail: { projectId: btn.getAttribute("data-test") } });
    });
  });
};
