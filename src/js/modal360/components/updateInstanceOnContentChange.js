import { viewerSwiper } from "@/modal360/components/swiper/viewerSwiper.js";

export default function updateInstanceOnContentChange() {
  window.addEventListener("slides-painted", (e) => {
    viewerSwiper();
  });
};
