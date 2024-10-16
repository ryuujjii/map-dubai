import paintSwiperSlides from '@/modal360/content/slides/paintSwiperSlides';
import paintGalleryItems from '@/modal360/content/gallery/paintGalleryItems';
export default function recieveMsg() {
  window.addEventListener("modal360-media", (event) => {
    const { slides, gallery } = event.detail.media;
    paintSwiperSlides(slides);
    paintGalleryItems(gallery);
  });
  window.addEventListener("modal360-floorplan", (event) => {
    const { floorplan } = event.detail;
    // console.log(floorplan);
  });
  window.addEventListener("modal360-floorplans", (event) => {
    const { floorplans } = event.detail;
    // console.log(floorplans);
  });
};
