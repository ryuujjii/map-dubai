import paintSwiperSlides from '@/modal360/content/slides/paintSwiperSlides';
import paintGalleryItems from '@/modal360/content/gallery/paintGalleryItems';
import { popups } from '@/modal360/components/popups.js'
import { popContent } from '@/modal360/content/popups/index.js'

export default function recieveMsg() {
  popups()
  let data
  window.addEventListener("modal360-media", (event) => {
    const { slides, gallery } = event.detail.media;
    paintSwiperSlides(slides);
    paintGalleryItems(gallery);
    popContent(data, event.detail.floorplan)
  });

  // window.addEventListener("modal360-floorplan", (event) => {
  //   const { floorplan } = event.detail;
  // });

  window.addEventListener("modal360-floorplans", (event) => {
    const { floorplans } = event.detail;
    console.log(floorplans);
    data = floorplans
    // console.log(floorplans);
  });
};
