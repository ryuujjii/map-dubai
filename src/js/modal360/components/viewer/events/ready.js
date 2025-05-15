import setCopyRightTo from '@/modal360/components/copyRight/setCopytightTo';

export function ready(viewerInstance) {
  viewerInstance.addEventListener('ready', (e) => {
    document.documentElement.classList.add('viewer-ready');
    setCopyRightTo('.psv-navbar.psv--capture-event.psv-navbar--open', true);
  }, { once: true });
};