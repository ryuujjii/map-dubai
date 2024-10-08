export default function swiperPayment() {

    thumbSwiper = new Swiper(".paymentSwiperThumb", {
        modules: [Navigation],
        slidesPerView: "auto",
        centeredSlides: false,
        breakpoints: {
            0: {
                spaceBetween: 18,
            },
            767: {
                spaceBetween: 30,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 50,
            },
        },
        navigation: {
            nextEl: document.querySelector('.swiper-button-next'),
            prevEl: document.querySelector('.swiper-button-prev'),
        },
    });

    mainSwiper = new Swiper(".paymentSwiper", {
        modules: [EffectFade, Thumbs],
        spaceBetween: 10,
        slidesPerView: 1,
        watchSlidesProgress: true,
        allowTouchMove: false,
        effect: "fade",
        thumbs: {
            swiper: thumbSwiper,
        }
    });

}