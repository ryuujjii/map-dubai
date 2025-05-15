import { queryMatches } from "utils";

export default function replaceBlocks() {
  let developeIMGBlock = document.querySelector(".developer__media");
  let developerInfoBlock = document.querySelector(".developer__info");
  let closeBtn = document.querySelector('[data-popup="brochure"] .popup__close-btn')
  
  if (queryMatches(992)) {
    developerInfoBlock.appendChild(developeIMGBlock);
  }
  if (queryMatches(992)) {
    closeBtn.classList.add("pano-btn");
  }
}
