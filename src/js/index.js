import { plugins } from '@/components/plugins';
import { isMobileOrTablet, addClassName } from '@/components/utils';
import { header } from '@/components/header';
import { map } from '@/sections/map';
import '../scss/style.scss';
import project from '@/projects/project';
import closeComponent from '@/components/closeComponent';
import onEsc from '@/components/esc/onEsc';
import { preloader } from '@/components/preloader';
import showProjects from '@/projects/components/showProjects';
import replaceBlocks from '@/projects/components/replaceBlocks';
import { mediaLoading } from '@/components/preloaderAnim';
import { popup } from '@/components/popup';
import { canvasPopup } from '@/components/canvasPopup';
window.addEventListener('onbeforeunload', function () {
  window.scrollTo(0, 0);
  gsap.to(window, { duration: 0, scrollTo: 0 });
});

window.addEventListener('unload', function () {
  window.scrollTo(0, 0);
  gsap.to(window, { duration: 0, scrollTo: 0 });
});

window.addEventListener('DOMContentLoaded', () => {
  isMobileOrTablet()
    ? addClassName(document.documentElement, 'mob-device')
    : null;
  plugins();
  mediaLoading();
  preloader();
  header();
  map();
  project();
  closeComponent();
  // onEsc();
  showProjects();
  replaceBlocks();
  // popup()
  canvasPopup()

  document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
    document.body.style.zoom = 1;
  });

  document.addEventListener('gesturechange', function (e) {
    e.preventDefault();
    document.body.style.zoom = 1;
  });

  document.addEventListener('gestureend', function (e) {
    e.preventDefault();
    document.body.style.zoom = 1;
  });
});

//disable context menu
// document.addEventListener('contextmenu', event => {
//   event.preventDefault();
// });
