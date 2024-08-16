import getCopyRightForMedia from '@/modal360/components/copyRight/getCopyRightForMedia';
export default function setCopyRightTo(destination, isNewLine) {
  const parentBlock = typeof destination === 'string' ? document.querySelector(destination) : destination;
  const newDiv = getCopyRightForMedia(isNewLine);
  parentBlock.appendChild(newDiv);
}