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
        <div class="location-dot__icon"><img src="${dot.icon}" alt=""></div>
      </div>
    </foreignObject>
  `;
}
function getCenterLocationFn() {
  const locationScroll = document.querySelector('.location-about__map-scroll');
  // const locationMedia = document.querySelector('.location-about__map-container');
  return function centerLocation({ dot }) {
    removeClassName(locationScroll, 'no-scroll');

    // let x = calculateNewPos(locationScroll.offsetWidth, locationMedia.offsetWidth, dot.centerPosotion.x);
    // let y = calculateNewPos(locationScroll.offsetHeight, locationMedia.offsetHeight, dot.centerPosotion.y);
    console.log(locationScroll.offsetHeight / 2);
    gsap.to(locationScroll, {
      scrollTo: {
        x: 0,
        y: 0
      },
      onComplete: () => {
        gsap.to(locationScroll, {
          scrollTo: {
            x: '.location-dot',
            y: '.location-dot',
            offsetX: locationScroll.offsetWidth / 2,
            offsetY: locationScroll.offsetHeight / 2
          },
          onComplete() {
            addClassName(locationScroll, 'no-scroll');
          }
        });
      }
    });
  };
  function calculateNewPos(parentSize, mediaSize, offset) {
    return Math.abs(mediaSize / 2 - parentSize / 2 - mediaSize * offset);
  }
}

const centerLocation = getCenterLocationFn();

export default function locationDot(projectLocationDot, content) {
  projectLocationDot.innerHTML = getLocationDotLayout(content);
  centerLocation(content);
};
