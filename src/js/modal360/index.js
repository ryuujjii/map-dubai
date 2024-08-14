import '../../scss/modal360/style.scss';
import { gallery } from "@/modal360/components/gallery";
import { haveIntExt } from "@/modal360/components/swiper/haveIntExt.js";
import { viewer } from "@/modal360/components/viewer/viewer.js";
import { viewerSwiper } from "@/modal360/components/swiper/viewerSwiper.js";
import { removeClassToAlter } from "@/modal360/components/alter_parent_window.js";
import updateInstanceOnContentChange from "@/modal360/components/updateInstanceOnContentChange.js";

import recieveMsg from '@/modal360/content/recieveMsg';

window.addEventListener('DOMContentLoaded', (params) => {
  recieveMsg();
  viewer();
  viewerSwiper();
  haveIntExt();
  gallery();
  updateInstanceOnContentChange();
});

window.addEventListener('unload', function (event) {
  removeClassToAlter();
});