export default function aboutItemLayout(data) {
  return `
      <div class="amenities-about__item item-amenities-about">
        <div class="item-amenities-about__wrapper">
          <div class="item-amenities-about__icon">
            <img src="${data.img}" alt="icon" />
          </div>
          <div class="item-amenities-about__title">${data.title}</div>
          <div class="item-amenities-about__text">${data.text}</div>
        </div>
      </div>
  `;
};
