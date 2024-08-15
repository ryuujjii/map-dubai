import { queryMatches } from 'utils';

const IS_MOBILE = queryMatches(479.98);

export default function getCopyRightForMedia(isNewline) {
  const currentYear = new Date().getFullYear();
  const newDiv = document.createElement("div");
  newDiv.className = "copiryit-text";
  newDiv.innerHTML += `© ${currentYear} All rights reserved. ${IS_MOBILE && isNewline ? '<br/>' : ''}No commercial reuse without permission.`;
  return newDiv;
}


