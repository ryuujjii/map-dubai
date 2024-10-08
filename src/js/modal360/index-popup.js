import { plugins } from '@/components/plugins';
import { isMobileOrTablet, addClassName } from '@/components/utils';

import "../../scss/modal360/style.scss";


window.addEventListener('DOMContentLoaded', () => {
  isMobileOrTablet()
    ? addClassName(document.documentElement, 'mob-device')
    : null;
  plugins();
});

//disable context menu
// document.addEventListener('contextmenu', event => {
//   event.preventDefault();
// });
