import L from 'leaflet';
import { queryMatches, isMobileOrTablet } from 'utils';
import pano from '@/sections/pano';
import { directionDots } from '@/sections/directionDots';

export function map() {

    let darkMap = 'img/map/dark.jpg'
    let lightMap = 'img/map/light.png'
    // let darkMap = 'img/map/map-dark.jpg'
    // let lightMap = 'img/map/map-light.jpg'


    window.addEventListener('media-loaded', () => {
        // const bounds = [[0, 0], [2304, 4072]];
        const bounds = [[0, 0], [2160, 3815]];

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

        map.on('zoom viewreset move', () => {
            updateOverlay(darkMapWrapper);
            updateOverlay(lightMapWrapper);
        });

        const centerCoordinates = [-window.innerHeight / 2, 940];
        map.setView(centerCoordinates, 0);

        updateOverlay(darkMapWrapper);
        updateOverlay(lightMapWrapper);


        // Custom Create map
        // for test with pano data-modal-open="files/pano/index.html"
        fetch('files/json/markers/project.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(proj => {
                    // if (proj.visibility === true) {
                    const icon = L.divIcon({
                        className: 'map__marker-item',
                        html: `
                                <button class="map__marker" data-test="${proj.dataName}" 
                                ${__SHOWPANO__ ? 'data-modal-open="files/pano/"' : ''}>
                                    <div class="map__marker-icon">
                                        <img src="${proj.icon}" alt="">
                                    </div>
                                    <div class="map__marker-content">
                                        <p class="map__marker-name">${proj.name}</p>
                                        <p class="map__marker-text">Click to experience</p>
                                    </div>
                                </button>
                            `,

                    });
                    L.marker(proj.coordinates, { icon: icon }).addTo(map);
                    // } else { }

                });
                pano();
                directionDots(data, map)
            });


        // Light Effect On MAP

        function clipPathEffect() {

            document.body.classList.add('clipPathEffect')

            const circleClip = document.querySelector(".light-map");

            function getRelativePosition(e) {
                const rect = circleClip.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                return { x, y };
            }

            function circleMove(e) {
                const { x, y } = getRelativePosition(e);
                circleClip.style.setProperty("--x", x + "px");
                circleClip.style.setProperty("--y", y + "px");
            }

            document.addEventListener("mousemove", circleMove);

            circleClip.addEventListener("touchmove", (e) => {
                let touch = e.touches[0];
                e.preventDefault();

                const { x, y } = getRelativePosition(touch);
                circleClip.style.setProperty("--x", x + "px");
                circleClip.style.setProperty("--y", y + "px");
            });
        }

        function maskImageEffect() {
            const lightMap = document.querySelector('.light-map');
            const lightMapImg = lightMap.querySelector('img');
            document.body.classList.add('maskImageEffect');

            document.addEventListener("mousemove", (event) => {
                const rect = lightMap.getBoundingClientRect();
                const x = (event.clientX - rect.left) * (lightMap.offsetWidth / rect.width);
                const y = (event.clientY - rect.top) * (lightMap.offsetHeight / rect.height);

                const circleHeight = window.innerHeight / 1.2;
                const circleHeightHalf = circleHeight / 2;

                lightMapImg.style.maskSize = `${circleHeight}px ${circleHeight}px`;
                lightMapImg.style.maskPosition = `${x - circleHeightHalf}px ${y - circleHeightHalf}px`;
                lightMapImg.style.webkitMaskPosition = `${x - circleHeightHalf}px ${y - circleHeightHalf}px`;
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

            if (/chrome|crios|crmo/i.test(userAgent) && !/edge|edg/i.test(userAgent)) {
                browserName = 'Chrome';
                svgMaskEffect();
            } else if (/safari/i.test(userAgent) && !/chrome|crios|crmo|edg|edge/i.test(userAgent)) {
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
                lightMapImg.style.maskPosition = `${x - circleHeightHalf}px ${y - circleHeightHalf}px`;
                lightMapImg.style.webkitMaskPosition = `${x - circleHeightHalf}px ${y - circleHeightHalf}px`;
            });

        } else {
            getBrowser();
            // svgMaskEffect();
            // clipPathEffect()
            // console.log('Browser:', getBrowser());
        }
    })

}