import { getCopyRightForMedia } from './get_copy_right_for_media.js';
export function setCopyRightTo(destination, isNewLine) {
  const parentBlock = typeof destination === 'string' ? document.querySelector(destination) : destination;
  const newDiv = getCopyRightForMedia(isNewLine);
  parentBlock.appendChild(newDiv);
}