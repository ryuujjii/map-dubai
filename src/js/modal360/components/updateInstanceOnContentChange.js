import { viewerSwiper } from "@/modal360/components/swiper/viewerSwiper.js";
import { haveIntExt } from "@/modal360/components/swiper/haveIntExt.js";

export default function updateInstanceOnContentChange() {
  window.addEventListener("slides-painted", (e) => {
    haveIntExt();
    viewerSwiper();
  });
};
