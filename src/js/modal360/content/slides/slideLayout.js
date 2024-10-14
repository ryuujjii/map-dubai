function getSlideLayout() {
  const source = {
    exteriors: {
      class: "ext",
      text: "360"
    },
    interiors: {
      class: "int",
      text: "360"
    }
  };
  return function slideLayout(type, img360, img360Preview) {
    const extOrIntData = type === 'exteriors' ? source.exteriors : source.interiors;
    return `
            <div class="swiper-slide ${extOrIntData.class}"
            data-src="${img360}">
            <img loading="lazy"
              src="${img360Preview}"
              alt="photo" />
            <div class="swiper-slide-text">${extOrIntData.text}</div>
          </div>
    `;
  };
}

const slideLayout = getSlideLayout();

export default slideLayout;
