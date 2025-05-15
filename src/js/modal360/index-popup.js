import { plugins } from '@/components/plugins';
import { isMobileOrTablet, addClassName } from '@/components/utils';
import { popups } from "./components/popups.js";

import "../../scss/modal360/style.scss";


window.addEventListener('DOMContentLoaded', () => {
  isMobileOrTablet()
    ? addClassName(document.documentElement, 'mob-device')
    : null;
  plugins();
  popups();

});

//disable context menu
// document.addEventListener('contextmenu', event => {
//   event.preventDefault();
// });
