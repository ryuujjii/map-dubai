import { dispatchCustomEvent } from 'utils';
export default function testBtns() {
  console.log('test btcn fn');
  const btns = document.querySelectorAll('[data-test]');
  btns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      // btn.getAttribute('data-test')
      dispatchCustomEvent({ el: window, event: "show-project", detail: { projectId: "keturah-resort" } });
    });
  });
};
