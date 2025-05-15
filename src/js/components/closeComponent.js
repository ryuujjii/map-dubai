import { dispatchCustomEvent } from 'utils';
export default function closeComponent() {
  const closeBtns = document.querySelectorAll('[data-close]');
  const preloaderVal = document.querySelector('.preloader');
  closeBtns.forEach((closeBtn) => {
    closeBtn.addEventListener('click', (e) => {
      const target = closeBtn.getAttribute('data-close');
      dispatchCustomEvent({ el: window, event: `close-${target}` });
      if (target == 'pano') {
        preloaderVal.classList.remove('in-project');
      }
    });
  });
}
