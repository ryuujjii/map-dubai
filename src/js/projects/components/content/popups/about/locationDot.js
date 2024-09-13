import { removeClassName, addClassName } from 'utils';

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
        <div class="location-dot__icon" style="${dot.styles}"><img src="${dot.icon}" alt=""></div>
      </div>
    </foreignObject>
        <foreignObject width="30" height="30" x="${dot.centerPosotion.x}" y="${dot.centerPosotion.y}">
          <div class="shadow-dot"></div>
        </foreignObject>
  `;
}
function getCenterLocationFn() {
  const locationScroll = document.querySelector('.location-about__map-scroll');
  return function centerLocation({ dot }) {
    // removeClassName(locationScroll, 'no-scroll');
    gsap.to(locationScroll, {
      scrollTo: {
        x: 0,
        y: 0
      },
      onComplete: () => {
        gsap.to(locationScroll, {
          scrollTo: {
            x: '.shadow-dot',
            y: '.shadow-dot',
          },
          onComplete() {
            // addClassName(locationScroll, 'no-scroll');
          }
        });
      }
    });
  };
  // function calculateNewPos(parentSize, mediaSize, offset) {
  //   return Math.abs(mediaSize / 2 - parentSize / 2 - mediaSize * offset);
  // }
}

const centerLocation = getCenterLocationFn();

export default function locationDot(projectLocationDot, content) {
  projectLocationDot.innerHTML = getLocationDotLayout(content);
  centerLocation(content);
};
