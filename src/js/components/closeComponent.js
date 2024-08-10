import { dispatchCustomEvent } from 'utils';
export default function closeComponent() {
  const closeBtns = document.querySelectorAll('[data-close]');
  closeBtns.forEach(closeBtn => {
    closeBtn.addEventListener("click", (e) => {
      const target = closeBtn.getAttribute('data-close');
      dispatchCustomEvent({ el: window, event: `close-${target}` });
    });
  });
};
