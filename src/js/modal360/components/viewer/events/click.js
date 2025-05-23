import { toggleClassName } from "utils";
import { toggleClassToAlter } from "@/modal360/components/alterParentWindow";
import setPanorama from "@/modal360/components/viewer/setPanorama";

export function click() {
  const viewerLoader = document.querySelector(".viewer__loader");
  document.addEventListener("click", function (e) {
    const target = e.target;
    if (target.closest(".swiper-slide")) {
      setPanorama(target.closest(".swiper-slide"));
      viewerLoader.classList.remove("ready");
    }

    if (target.closest(".viewer__fake-fullscreen")) {
      handleFakeFullscreen(target.closest(".viewer__fake-fullscreen"));
    }
  });
}

function handleFakeFullscreen(el) {
  toggleClassName(document.body, "fake-fullscreen-active");
  toggleClassToAlter();
}
