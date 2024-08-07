import L from 'leaflet';
import { queryMatches } from 'utils';

export function map() {

    // const LAPTOP = queryMatches('max', 1720)
    const bounds = [[0, 0], [2304, 4072]];


    const map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: 0,
        maxZoom: 0,
        maxBounds: bounds,
        maxBoundsViscosity: 1.0,
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
        svgWrapper.className = 'light-map__svg-wrapper'
        svgWrapper.innerHTML = svgContent;
        wrapper.appendChild(svgWrapper)


        // wrapper.innerHTML = svgContent
        overlayPane.appendChild(wrapper);

        return wrapper;
    }

    const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
                <defs>
                <filter id="blurFilter">
                <feGaussianBlur in="SourceGraphic" stdDeviation="35" result="blurred" />
                <feMorphology in="blurred" operator="dilate" radius="10" result="dilated" />
                <feComposite in="SourceGraphic" in2="dilated" operator="over" />
                </filter>
            
                <mask id="mask">
                <circle cx="50%" cy="50%" r="250" fill="#fff" filter="url(#maskBlur)" />
                <filter id="maskBlur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="35" />
                </filter>
                </mask>
                </defs>
        </svg>
        `;

    overlayPane.innerHTML = svgContent
    // <image xlink:href="img/map/map-light.jpg" width="${bounds[1][1]}" height="${bounds[1][0]}" mask="url(#mask)"></image>

    // const lightMapWrapper = createSvgOverlay(svgContent, 'light-map');

    const darkMapWrapper = createImageOverlay('img/map/map-dark-min.jpg', 'dark-map');
    const lightMapWrapper = createImageOverlay('img/map/map-light-min.jpg', 'light-map');

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

    const centerCoordinates = [-window.innerHeight / 2, 1200];
    // const centerCoordinates = [650, 0];
    map.setView(centerCoordinates, 0);

    updateOverlay(darkMapWrapper);
    updateOverlay(lightMapWrapper);


    // Custom Create map


    const markers = [
        {
            coordinates: [480, 725],
            text: "SLS Residence",
            media: 'img/map/projects/sls-residence.jpg',
            dataName: "sls-residence"
        },
        {
            coordinates: [300, 1000],
            text: "Valori",
            media: 'img/map/projects/valori.jpg',
            dataName: "sls-residence"
        },
    ];

    markers.forEach(markerData => {
        const icon = L.divIcon({
            className: 'map__marker-item',
            html: `
    <button class="map__marker" data-marker="${markerData.dataName}">
    <div class="map__marker-icon"><img src="${markerData.media}" alt=""></div>
     <div class="map__marker-content">
     <p class="map__marker-name">${markerData.text}</p>
     </div>
    </button>
            `,
        });

        L.marker(markerData.coordinates, { icon: icon }).addTo(map);
    });


    // Circle LIGHT MAP 
    // const circleClip = document.querySelector(".light-map");

    // function getRelativePosition(e) {
    //     const rect = circleClip.getBoundingClientRect();
    //     const x = e.clientX - rect.left;
    //     const y = e.clientY - rect.top;
    //     return { x, y };
    // }

    // function circleMove(e) {
    //     const { x, y } = getRelativePosition(e);
    //     circleClip.style.setProperty("--x", x + "px");
    //     circleClip.style.setProperty("--y", y + "px");
    // }

    // document.addEventListener("mousemove", circleMove);

    // circleClip.addEventListener("touchmove", (e) => {
    //     let touch = e.touches[0];
    //     e.preventDefault();

    //     const { x, y } = getRelativePosition(touch);
    //     circleClip.style.setProperty("--x", x + "px");
    //     circleClip.style.setProperty("--y", y + "px");
    // });

    const lightMap = document.querySelector('.light-map');
    const maskCircle = document.querySelector('circle');
    
    document.addEventListener('mousemove', (event) => {
        const rect = lightMap.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const radius = window.innerHeight / 2.2;

        maskCircle.setAttribute('r', radius);
        maskCircle.setAttribute('cx', x);
        maskCircle.setAttribute('cy', y);
    });
    

}