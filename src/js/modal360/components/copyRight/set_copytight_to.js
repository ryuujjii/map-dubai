import getCopyRightForMedia from '@/modal360/components/copyRight/get_copy_right_for_media';
export default function setCopyRightTo(destination, isNewLine) {
  const parentBlock = typeof destination === 'string' ? document.querySelector(destination) : destination;
  const newDiv = getCopyRightForMedia(isNewLine);
  parentBlock.appendChild(newDiv);
}