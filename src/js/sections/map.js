import L from 'leaflet';
import { queryMatches, isMobileOrTablet } from 'utils';
import pano from '@/sections/pano';
import projectLoaders from '@/projects/projectLoaders';
import { directionDots } from '@/sections/directionDots';
import { popup } from '@/components/popup';

export function map() {
  // let darkMap = 'https://d3b6muno9lbfvx.cloudfront.net/project-map/img/map/map-dark.jpg';
  // let lightMap = 'https://d3b6muno9lbfvx.cloudfront.net/project-map/img/map/light.png';
  let darkMap = "../img/map.jpg"
  let lightMap = "../img/building.png"

  window.addEventListener('media-loaded', () => {
    // const bounds = [[0, 0], [2304, 4072]];
    const bounds = [
      [0, 0],
      [2160, 3840],
    ];

    const map = L.map('map', {
      crs: L.CRS.Simple,
      minZoom: 0,
      maxZoom: 0,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
      zoomControl: false,
      touchZoom: false,
      doubleClickZoom: false,
      scrollWheelZoom: false,
      keyboard: false,
    });

    let overlayPane = map.getPane('overlayPane');

    function createImageOverlay(src, className) {
      const wrapper = document.createElement('div');
      wrapper.className = `leaflet-image-layer leaflet-zoom-animated ${className}`;

      const img = document.createElement('img');
      img.src = src;
      img.style.position = 'absolute';

      wrapper.appendChild(img);

      overlayPane.appendChild(wrapper);
      return wrapper;
    }

    function createSvgOverlay(svgContent, className) {
      const wrapper = document.createElement('div');
      wrapper.className = `leaflet-image-layer leaflet-zoom-animated ${className}`;

      const svgWrapper = document.createElement('div');
      svgWrapper.className = 'light-map__svg-wrapper';
      svgWrapper.innerHTML = svgContent;
      wrapper.appendChild(svgWrapper);

      // wrapper.innerHTML = svgContent
      overlayPane.appendChild(wrapper);

      return wrapper;
    }

    const darkMapWrapper = createImageOverlay(darkMap, 'dark-map');
    const lightMapWrapper = createImageOverlay(lightMap, 'light-map');

    function updateOverlay(wrapper) {
      const topLeft = map.latLngToLayerPoint([bounds[0][0], bounds[0][1]]);
      const bottomRight = map.latLngToLayerPoint([bounds[1][0], bounds[1][1]]);
      const size = bottomRight.subtract(topLeft);

      L.DomUtil.setPosition(wrapper, topLeft);
      wrapper.style.width = size.x + 'px';
      wrapper.style.height = bounds[1][0] + 'px';
      wrapper.style.marginTop = -bounds[1][0] + 'px';
    }

    const centerCoordinates = [1100, 1250];
    map.setView(centerCoordinates, 0);

    updateOverlay(darkMapWrapper);
    updateOverlay(lightMapWrapper);


    // Opening Markers in center viewport MB
    function zoomPinInViewport() {
      if (isMobileOrTablet()) {
        function addZoomClassToMarker(marker) {
          marker.classList.add('_zoom');
        }

        function removeZoomClassFromMarker(marker) {
          marker.classList.remove('_zoom');
        }

        function isMarkerInCenterViewport(entry) {
          const centralViewportWidth = window.innerWidth * 0.9;
          const centralViewportHeight = window.innerWidth * 0.9;
          const centralViewportLeft =
            (window.innerWidth - centralViewportWidth) / 2;
          const centralViewportTop =
            (window.innerHeight - centralViewportHeight) / 2;

          const markerRect = entry.boundingClientRect;
          const markerCenterX = markerRect.left + markerRect.width / 2;
          const markerCenterY = markerRect.top + markerRect.height / 2;

          return (
            markerCenterX >= centralViewportLeft &&
            markerCenterX <= centralViewportLeft + centralViewportWidth &&
            markerCenterY >= centralViewportTop &&
            markerCenterY <= centralViewportTop + centralViewportHeight
          );
        }

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (isMarkerInCenterViewport(entry)) {
                addZoomClassToMarker(entry.target);

              } else {
                removeZoomClassFromMarker(entry.target);
              }
            });
          },
          {
            threshold: 0.5,
          }
        );

        const markers = document.querySelectorAll('.map__marker');

        // Наблюдаем за каждым маркером
        markers.forEach((marker) => {
          observer.observe(marker);
        });
      }
    }

    // Click Dot to fly
    function handlePinClick(event) {
      const el = event.target.closest('.pin');
      if (!el) return;

      const coordinate = el.getAttribute('data-cor').split(',');
      const increments = [-10, 80];
      const newCoordinate = coordinate.map((value, index) =>
        (parseInt(value) + increments[index]).toString()
      );

      map.panTo(L.latLng(newCoordinate), {
        animate: true,
        duration: 1,
      });
    }

    function initializePinClickListeners() {
      const pinContainer = document.querySelector('.map__dots');

      if (!pinContainer.getAttribute('data-listener-attached')) {
        pinContainer.addEventListener('click', handlePinClick);
        pinContainer.setAttribute('data-listener-attached', 'true');
      }
    }

    // Custom Create map
    // for test with pano data-modal-open="files/pano/index.html"
    fetch('files/json/markers/project.json')
      .then((response) => response.json())
      .then((data) => {
        data.forEach((proj) => {
          if (proj.isPopup === false) {
            const icon = L.divIcon({
              className: 'map__marker',
              html: `
                  <div class="map__marker-trigger">
                    <button class="map__marker-button" 
                        data-modal-logo="${proj.dataTestName}" 
                        data-test="${proj.dataTestName}" 
                        ${__SHOWPANO__ ? `data-modal-open="files/pano/${proj.dataName}"` : ''}>
                      <div class="map__marker-icon">
                        <img src="${proj.icon}" alt="">
                      </div>
                      <div class="map__marker-content">
                        <p class="map__marker-name">${proj.name}</p>
                        <p class="map__marker-text">Click to experience</p>
                      </div>
                    </button>
                  </div>
                  `,
            });
            L.marker(proj.coordinates, { icon: icon }).addTo(map);
          } else {
            const icon = L.divIcon({
              className: 'map__marker map__marker--hot',
              html: `
                  <div class="map__marker-trigger">
                      <button class="map__marker-button" data-marker-popup-btn="${proj.dataName}">
                          <div class="map__marker-icon">
                              <img src="${proj.icon}" alt="">
                          </div>
                          <div class="map__marker-content">
                              <p class="map__marker-name">${proj.name}</p>
                              <p class="map__marker-text">hot offer</p>
                          </div>
                      </button>
                  </div>
                  `,
            });
            L.marker(proj.coordinates, { icon: icon }).addTo(map);
          }
        });
        pano();
        projectLoaders(data)
        directionDots(data, map);
        zoomPinInViewport();
        initializePinClickListeners();
        popup();
      });

    // Light Effect On MAP
    function clipPathEffect() {
      document.body.classList.add('clipPathEffect');

      const circleClip = document.querySelector('.light-map');

      function getRelativePosition(e) {
        const rect = circleClip.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        return { x, y };
      }

      function circleMove(e) {
        const { x, y } = getRelativePosition(e);
        circleClip.style.setProperty('--x', x + 'px');
        circleClip.style.setProperty('--y', y + 'px');
      }

      document.addEventListener('mousemove', circleMove);

      circleClip.addEventListener('touchmove', (e) => {
        let touch = e.touches[0];
        e.preventDefault();

        const { x, y } = getRelativePosition(touch);
        circleClip.style.setProperty('--x', x + 'px');
        circleClip.style.setProperty('--y', y + 'px');
      });
    }

    function maskImageEffect() {
      const lightMap = document.querySelector('.light-map');
      const lightMapImg = lightMap.querySelector('img');
      document.body.classList.add('maskImageEffect');

      document.addEventListener('mousemove', (event) => {
        const rect = lightMap.getBoundingClientRect();
        const x =
          (event.clientX - rect.left) * (lightMap.offsetWidth / rect.width);
        const y =
          (event.clientY - rect.top) * (lightMap.offsetHeight / rect.height);

        const circleHeight = window.innerHeight / 1.2;
        const circleHeightHalf = circleHeight / 2;

        lightMapImg.style.maskSize = `${circleHeight}px ${circleHeight}px`;
        lightMapImg.style.maskPosition = `${x - circleHeightHalf}px ${y - circleHeightHalf
          }px`;
        lightMapImg.style.webkitMaskPosition = `${x - circleHeightHalf}px ${y - circleHeightHalf
          }px`;
      });
    }

    function svgMaskEffect() {
      document.body.classList.add('svgMaskEffect');

      const lightMap = document.querySelector('.light-map');
      const maskCircle = document.querySelector('circle');

      document.addEventListener('mousemove', (event) => {
        const rect = lightMap.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const radius = window.innerHeight / 4;

        maskCircle.setAttribute('r', radius);
        maskCircle.setAttribute('cx', x);
        maskCircle.setAttribute('cy', y);
      });
    }

    function getBrowser() {
      const userAgent = navigator.userAgent;
      let browserName = 'Unknown';

      if (
        /chrome|crios|crmo/i.test(userAgent) &&
        !/edge|edg/i.test(userAgent)
      ) {
        browserName = 'Chrome';
        svgMaskEffect();
      } else if (
        /safari/i.test(userAgent) &&
        !/chrome|crios|crmo|edg|edge/i.test(userAgent)
      ) {
        browserName = 'Safari';
        maskImageEffect();
      } else if (/firefox|fxios/i.test(userAgent)) {
        browserName = 'Firefox';
        svgMaskEffect();
      } else if (/opr|opera/i.test(userAgent)) {
        browserName = 'Opera';
        svgMaskEffect();
      } else if (/msie|trident/i.test(userAgent)) {
        browserName = 'Internet Explorer';
        svgMaskEffect();
      } else if (/edg|edge/i.test(userAgent)) {
        browserName = 'Edge';
        svgMaskEffect();
      }

      return browserName;
    }

    // Circle LIGHT EFFECT for Mobile and Desktop devices
    if (isMobileOrTablet()) {
      document.body.classList.add('maskImageEffect');
      const lightMap = document.querySelector('.light-map');
      const lightMapImg = document.querySelector('.light-map img');

      map.on('load viewreset move', (event) => {
        const rect = lightMap.getBoundingClientRect();

        let x, y;

        if (event.touches) {
          // Handle touch events
          let touch = event.touches[0];
          x = touch.clientX - rect.left;
          y = touch.clientY - rect.top;
        } else {
          // Handle mouse or other events
          x = window.innerWidth / 2 - rect.left;
          y = window.innerHeight / 2 - rect.top;
        }

        const circleHeight = window.innerHeight / 1.5;
        const circleHeightHalf = circleHeight / 2;

        lightMapImg.style.maskSize = `${circleHeight}px ${circleHeight}px`;
        lightMapImg.style.maskPosition = `${x - circleHeightHalf}px ${y - circleHeightHalf
          }px`;
        lightMapImg.style.webkitMaskPosition = `${x - circleHeightHalf}px ${y - circleHeightHalf
          }px`;
      });
    } else {
      getBrowser();
    }

    map.on('zoom viewreset move', () => {
      updateOverlay(darkMapWrapper);
      updateOverlay(lightMapWrapper);
      zoomPinInViewport()
      initializePinClickListeners()
    });


    let dragMap = false

    map.addEventListener('click', () => {
      if (!dragMap) {
        document.body.classList.add('dragged');
        dragMap = true;
      }
    })

    map.on('dragstart dragend', function () {
      if (!dragMap) {
        document.body.classList.add('dragged');
        dragMap = true;
      }
    });
  })

}

export function dragHandFn() {
	let tlDragHand = gsap.timeline({
		defaults: {
			stagger: 0.1,
		}, repeat: -1, repeatDelay: 5
	});
	tlDragHand.to(".map__draggable-hand-decor", {
		xPercent: -130,
		duration: 0.7,
	});

	tlDragHand.to(".map__draggable-hand-decor", {
		opacity: 0,
	}, 0.4);

	tlDragHand.to(".map__draggable-hand-decor", {
		xPercent: 100,
		duration: 0.01,
	},">");

	tlDragHand.to(".map__draggable-hand-decor", {
		opacity: 1,
	},">");

	tlDragHand.to(".map__draggable-hand-decor", {
		xPercent: 0,
		duration: 0.5,
	},"<");
}