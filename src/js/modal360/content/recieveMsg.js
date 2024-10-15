import paintSwiperSlides from '@/modal360/content/slides/paintSwiperSlides';
import paintGalleryItems from '@/modal360/content/gallery/paintGalleryItems';
export default function recieveMsg() {
  window.addEventListener("modal360-content", (event) => {
    const { media: { slides, gallery }, floorplan } = event.detail;
    paintSwiperSlides(slides);
    paintGalleryItems(gallery);
    console.log(floorplan);
  });
};
