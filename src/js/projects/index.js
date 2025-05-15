import { plugins } from "@/components/plugins";
import { isMobileOrTablet, addClassName } from '@/components/utils';
import map from "@/projects/components/map";
import popup from "@/projects/components/popup";
import '../../scss/projects/style.scss';
import modal360 from "@/projects/components/modal360";

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
  map();
  modal360();
});

//disable context menu
document.addEventListener('contextmenu', event => {
  event.preventDefault();
});