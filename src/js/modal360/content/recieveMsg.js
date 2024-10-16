import paintSwiperSlides from '@/modal360/content/slides/paintSwiperSlides';
import paintGalleryItems from '@/modal360/content/gallery/paintGalleryItems';
export default function recieveMsg() {
  window.addEventListener("modal360-media", (event) => {
    const { slides, gallery } = event.detail.media;
    paintSwiperSlides(slides);
    paintGalleryItems(gallery);
  });
};
