export default function developerItemsLayout(data) {
  return `
    <li class="developer__stat ${data.classNames}">
      <div class="developer__number">${data.number}</div>
      <div class="developer__text">${data.text}</div>
    </li>
  `;
};
