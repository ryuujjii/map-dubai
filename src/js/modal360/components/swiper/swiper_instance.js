import Swiper from "swiper";
import { Navigation } from "swiper/modules";
Swiper.use([Navigation]);
import 'swiper/css';


export const swiperInstance = new Swiper(".swiper", {
  spaceBetween: 2,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
