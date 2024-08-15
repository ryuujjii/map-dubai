import { getPaintedItems } from '@/projects/components/content/utils';
import itemLayout from '@/modal360/content/gallery/itemLayout';

function getPaintGalleryItems() {
  const gallery = document.querySelector('.gallery');
  return function paintGalleryItems(content) {
    getPaintedItems(gallery, content, itemLayout);
  };
}

const paintGalleryItems = getPaintGalleryItems();

export default paintGalleryItems;

