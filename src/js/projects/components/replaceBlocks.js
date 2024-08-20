import { queryMatches } from "utils";

export default function replaceBlocks() {
  let developeIMGBlock = document.querySelector(".developer__media");
  let developerInfoBlock = document.querySelector(".developer__info");

  let broCont = document.querySelector(".brochure__container");
  let broText = document.querySelector(".brochure__text-p");

  if (queryMatches(768)) {
    developerInfoBlock.appendChild(developeIMGBlock);
    broCont.appendChild(broText);
  }

}
