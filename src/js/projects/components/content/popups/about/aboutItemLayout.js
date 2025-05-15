export default function aboutItemLayout(data) {
  return `
    <li class="about-about__item item-about-about ${data.classNames}">
      <div class="item-about-about__number">${data.number}</div>
      <div class="item-about-about__text">${data.text}</div>
    </li>
  `
};
