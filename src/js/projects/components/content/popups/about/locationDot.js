export default function locationDot(projectLocationDot, content) {
  projectLocationDot.innerHTML = getLocationDotLayout(content);
};



function getLocationDotLayout({ dot }) {
  return `
    <foreignObject
      width="${dot.sizes.width}"
      height="${dot.sizes.height}"
      x="${dot.position.x}"
      y="${dot.position.y}"
      class="location-dot"
    >
      <div class="location-dot__wrapper">
        <div class="location-dot__icon"><img src="${dot.icon}" alt=""></div>
      </div>
    </foreignObject>
  `;
}