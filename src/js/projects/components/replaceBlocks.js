import { queryMatches } from "utils";

export default function replaceBlocks() {
  let developeIMGBlock = document.querySelector(".developer__media");
  let developerInfoBlock = document.querySelector(".developer__info");

  if (queryMatches(768)) {
    developerInfoBlock.appendChild(developeIMGBlock);
  }
}
