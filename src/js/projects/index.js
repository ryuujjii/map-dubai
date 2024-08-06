import { plugins } from "@/components/plugins";
import { isMobileOrTablet, addClassName } from '@/components/utils';
import '../../scss/projects/style.scss';
import { map } from "@/projects/components/map";

window.addEventListener("onbeforeunload", function () {
  window.scrollTo(0, 0);
  gsap.to(window, { duration: 0, scrollTo: 0 });
});

window.addEventListener("unload", function () {
  window.scrollTo(0, 0);
  gsap.to(window, { duration: 0, scrollTo: 0 });
});

window.addEventListener("DOMContentLoaded", () => {
  isMobileOrTablet() ? addClassName(document.documentElement, 'mob-device') : null;
  plugins();
  map();
});

//disable context menu
document.addEventListener('contextmenu', event => {
  event.preventDefault();
});