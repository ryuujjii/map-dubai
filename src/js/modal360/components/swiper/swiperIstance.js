import Swiper from "swiper";
import { Navigation } from "swiper/modules";
Swiper.use([Navigation]);
import 'swiper/css';


export const swiperInstance = new Swiper(".swiper", {
  // spaceBetween: 4,
  spaceBetween: 3,
  // direction: "vertical",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    1199: {
      direction: "horizontal", 
      spaceBetween: 3,

    },
    1200: {
      direction: "vertical", 
      spaceBetween: 4,

    },
  },
});
