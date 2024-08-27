import { queryMatches, isMobileOrTablet } from "utils";

export function directionDots(data, map) {
  const TABLET = queryMatches(991.98, "max");

  function createPinHTML(index, position, rotation) {
    const rotationForIcon = Math.sign(rotation) === 1 ? (rotation * -1) : Math.abs(rotation);
    return `
        <div class="pin" id="pin-${index}" style="top: ${position.top}px; left: ${position.left}px; transform: rotate(${rotation}deg);" data-cor='${data[index].coordinates}'>
    
          <div class="pin__wrapper">
            <div class="pin__icon" style="transform: rotate(${rotationForIcon}deg);">
              <img src='${data[index].icon}' /> 
            </div>
            <svg class="pin__arrow" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.74121 11.6367L10.1138 5.93869C11.2726 3.98084 11.2271 1.60471 11.2271 1.60471C11.2271 1.60471 11.2236 1.41949 11.2238 1.33971C11.1517 1.30556 10.986 1.22268 10.986 1.22268C10.986 1.22268 8.86049 0.159497 6.59456 0.363422L-0.000101399 0.956912C1.91686 1.93246 3.60397 3.42123 4.83543 5.37215C6.0669 7.32308 6.68514 9.48653 6.74121 11.6367Z" fill="white"/>
            </svg>
          </div>
        </div>
      `;
  }

  function isPointVisible(point) {
    const rect = point.getBoundingClientRect();
    const flagWidth = 150;
    const flagHeight = 50;

    return (
      rect.top >= -flagHeight &&
      rect.left >= -flagWidth &&
      rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) +
      flagHeight &&
      rect.right <=
      (window.innerWidth || document.documentElement.clientWidth) + flagWidth
    );
  }
  function calculatePinPosition(pointRect) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const marginTop = TABLET ? 100 : 50;
    const marginLeft = TABLET ? 20 : 120;
    const marginOther = TABLET ? 20 : 50;

    let position = { top: 0, left: 0 };

    const centerX = windowWidth / 2;
    const centerY = windowHeight / 2;

    const pointCenterX = pointRect.left + pointRect.width / 2;
    const pointCenterY = pointRect.top + pointRect.height / 2;

    const deltaX = pointCenterX - centerX;
    const deltaY = pointCenterY - centerY;


    const angleRadians = Math.atan2(deltaY, deltaX);
    const rotation = (angleRadians * 180) / Math.PI;

    if (pointRect.left < marginLeft) {
      position.left = marginLeft;
      position.top = Math.min(
        Math.max(pointRect.top + pointRect.height / 2, marginTop),
        windowHeight - marginTop - 20
      );
    } else if (pointRect.right > windowWidth) {
      position.left = windowWidth - marginOther - 24;
      position.top = Math.min(
        Math.max(pointRect.top + pointRect.height / 2, marginTop),
        windowHeight - marginTop
      );
    } else if (pointRect.top < marginOther) {
      position.top = marginTop;
      position.left = Math.min(
        Math.max(pointRect.left + pointRect.width / 2, marginLeft),
        windowWidth - marginOther
      );
    } else if (pointRect.bottom > windowHeight) {
      position.top = windowHeight - 50;
      position.left = Math.min(
        Math.max(pointRect.left + pointRect.width / 2, marginLeft),
        windowWidth - marginOther - 20
      );
    }

    return { position, rotation };
  }

  function updatePinsOnMapMove() {
    const points = document.querySelectorAll(".leaflet-marker-icon");
    const placedPins = [];
    points.forEach((point, index) => {
      const pinElement = document.querySelector(`#pin-${index}`);

      if (!isPointVisible(point)) {
        const pointRect = point.getBoundingClientRect();
        let { position, rotation } = calculatePinPosition(pointRect);

        for (let placedPin of placedPins) {
          if (arePinsOverlapping(position, placedPin.position)) {
            position = adjustPosition(position);
          }
        }

        let coordinate = data[index].coordinates;

        if (!pinElement) {
          const pinHTML = createPinHTML(index, position, rotation, coordinate);

          document
            .querySelector(".map__dots")
            .insertAdjacentHTML("beforeend", pinHTML);


        } else {
          pinElement.style.top = `${position.top}px`;
          pinElement.style.left = `${position.left}px`;
          pinElement.style.transform = `rotate(${rotation}deg)`;
          let pinIcon = pinElement.querySelector('.pin__icon');
          pinIcon.style.transform = `rotate(${Math.sign(rotation) === 1 ? (rotation * -1) : Math.abs(rotation)}deg)`;
          pinElement.setAttribute('data-cor', coordinate)


        }

        placedPins.push({ position, rotation, coordinate });

      } else {
        if (pinElement) {
          pinElement.remove();
        }
      }

    });

  }

  function arePinsOverlapping(pos1, pos2) {
    const pinWidth = 5;
    const pinHeight = 5;

    return (
      Math.abs(pos1.left - pos2.left) < pinWidth &&
      Math.abs(pos1.top - pos2.top) < pinHeight
    );
  }

  function adjustPosition(position) {
    const offset = 10;
    return {
      top: position.top + offset,
      left: position.left + 0,
    };
  }

  function clickDot() {
    const pinDiv = document.querySelectorAll(".pin")
    pinDiv.forEach(el => {
      console.log();
      el.addEventListener('click', () => {
        const coordinate = el.getAttribute('data-cor').split(",")
        const increments = [-10, 80];
        const newCoordinate = coordinate.map((value, index) => (parseInt(value) + increments[index]).toString());

        map.panTo(L.latLng(newCoordinate), {
          animate: true,
          duration: 1
        });
      })
    })
  }

  updatePinsOnMapMove();
  clickDot()

  map.on("move", () => {
    updatePinsOnMapMove();
    clickDot()
  });
}

