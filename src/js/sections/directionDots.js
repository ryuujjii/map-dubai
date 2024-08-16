import { queryMatches, isMobileOrTablet } from 'utils';

export function directionDots(data, map) {

  const TABLET = queryMatches(991.98, 'max');

  function createPinHTML(index, position, rotation) {
    return `
        <div class="pin" id="pin-${index}" style="top: ${position.top}px; left: ${position.left}px; transform: rotate(${rotation}deg);">
    
          <div class="pin__wrapper">
            <svg class="pin__arrow" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.74121 11.6367L10.1138 5.93869C11.2726 3.98084 11.2271 1.60471 11.2271 1.60471C11.2271 1.60471 11.2236 1.41949 11.2238 1.33971C11.1517 1.30556 10.986 1.22268 10.986 1.22268C10.986 1.22268 8.86049 0.159497 6.59456 0.363422L-0.000101399 0.956912C1.91686 1.93246 3.60397 3.42123 4.83543 5.37215C6.0669 7.32308 6.68514 9.48653 6.74121 11.6367Z" fill="white"/>
    </svg>
          </div>
        </div>
      `;
  }
  function isPointVisible(point) {
    const rect = point.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function calculatePinPosition(pointRect) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const marginTop = TABLET ? 100 : 50;
    const marginLeft = TABLET ? 20 : 120;
    const marginOther = TABLET ? 20 : 50;
  

    let position = { top: 0, left: 0 };
    let rotation = 0;

    if (pointRect.left < marginLeft) {
      position.left = marginLeft;
      position.top = Math.min(
        Math.max(pointRect.top + pointRect.height / 2, marginTop),
        windowHeight - marginTop
      );
      rotation = 90;
    } else if (pointRect.right > windowWidth) {
      position.left = windowWidth - marginOther - 24;
      position.top = Math.min(
        Math.max(pointRect.top + pointRect.height / 2, marginTop),
        windowHeight - marginTop
      );
      rotation = -90;
    } else if (pointRect.top < marginOther) {
      position.top = marginOther;
      position.left = Math.min(
        Math.max(pointRect.left + pointRect.width / 2, marginLeft),
        windowWidth - marginOther
      );
      rotation = 180;
    } else if (pointRect.bottom > windowHeight) {
      position.top = windowHeight - marginTop - 24;
      position.left = Math.min(
        Math.max(pointRect.left + pointRect.width / 2, marginLeft),
        windowWidth - marginOther
      );
      rotation = 0;
    }

    return { position, rotation };
  }
  function updatePinsOnMapMove() {
    const points = document.querySelectorAll(".leaflet-marker-icon");

    points.forEach((point, index) => {
      const pinElement = document.querySelector(`#pin-${index}`);

      if (!isPointVisible(point)) {
        const pointRect = point.getBoundingClientRect();
        const { position, rotation } = calculatePinPosition(pointRect);

        if (!pinElement) {
          const pinHTML = createPinHTML(index, position, rotation);
          document
            .querySelector(".map__dots")
            .insertAdjacentHTML("beforeend", pinHTML);
        } else {
          pinElement.style.top = `${position.top}px`;
          pinElement.style.left = `${position.left}px`;
          pinElement.style.transform = `rotate(${rotation}deg)`;
        }
      } else {
        if (pinElement) {
          pinElement.remove();
        }
      }
    });
  }

  map.on("move", () => {
    updatePinsOnMapMove();
  });
  updatePinsOnMapMove();
}