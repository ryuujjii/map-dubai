import { plugins } from "@/components/plugins";
import { isMobileOrTablet, addClassName } from '@/components/utils';
import { projectMap } from "@/projects/components/map";
import popup from "@/projects/components/popup";
import '../../scss/projects/style.scss';

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
  popup();
  projectMap();
});

//disable context menu
document.addEventListener('contextmenu', event => {
  event.preventDefault();
});