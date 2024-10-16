import "../../scss/modal360/style.scss";
import { gallery } from "@/modal360/components/gallery";
import { viewer } from "@/modal360/components/viewer/viewer.js";
import { removeClassToAlter } from "@/modal360/components/alterParentWindow.js";
import updateInstanceOnContentChange from "@/modal360/components/updateInstanceOnContentChange.js";
import { isMobileOrTablet, addClassName } from "@/components/utils";
import recieveMsg from "@/modal360/content/recieveMsg";
import btnSocials from "@/modal360/content/btnSocials";
import changeMedia from "@/modal360/content/popups/changeMedia";


window.addEventListener("DOMContentLoaded", (params) => {
  isMobileOrTablet()
    ? addClassName(document.documentElement, "mob-device")
    : null;
  recieveMsg();
  viewer();
  gallery();
  updateInstanceOnContentChange();
  btnSocials('')
  changeMedia()
});

window.addEventListener("unload", function (event) {
  removeClassToAlter();
});
