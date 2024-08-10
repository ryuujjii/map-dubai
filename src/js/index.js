import { plugins } from "@/components/plugins";
import { isMobileOrTablet, addClassName } from '@/components/utils';
import { header } from "@/components/header";
import { map } from "@/sections/map";
import '../scss/style.scss';
import project from "@/projects/project";
import closeComponent from "@/components/closeComponent";
import onEsc from "@/components/esc/onEsc";

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
  header();
  map();
  project();
  closeComponent();
  onEsc();
});

//disable context menu
// document.addEventListener('contextmenu', event => {
//   event.preventDefault();
// });