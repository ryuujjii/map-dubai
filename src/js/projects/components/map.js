import L from 'leaflet';

export function projectMap() {

    const bounds = [[0, 0], [window.innerHeight, window.innerWidth]];

    const map = L.map('project-map', {
        crs: L.CRS.Simple,
        minZoom: 0,
        maxZoom: 0,
        maxBounds: bounds,
        maxBoundsViscosity: 1.0,
        zoomControl: false,
        touchZoom: false,
        doubleClickZoom: false,
        scrollWheelZoom: false,
        keyboard: false
    });


    const frontLayer = L.imageOverlay('img/projects/key-mavens/map.jpg', bounds, { className: 'dark-map' });
    const backLayer = L.imageOverlay('img/projects/key-mavens/map-shadow.jpg', bounds, { className: 'light-map' });

    frontLayer.addTo(map);
    backLayer.addTo(map);
    map.fitBounds(bounds);

    const markers = [
        {
            coordinates: [500, 700],
            text: "Beachfront",
            media: 'img/map/projects/sls-residence.jpg',
        },
    ];


    markers.forEach(proj => {
        const icon = L.divIcon({
            className: 'project__dot-item',
            html: `
            <div class="project__dot dot-project right">
            <div class="dot-project__container">
                <div class="dot-project__wrapper">
                    <div class="dot-project__info">
                        <div class="dot-project__title">1-bedroom</div>
                        <div class="dot-project__type">loft style A</div>
                    </div>
                    <div class="dot-project__icon-wrapper">
                        <div
                            class="dot-project__icon"
                            style="--mask-image: url('../img/projects/icons/floorplan.svg')"
                        ></div>
                    </div>
                </div>
                <div class="dot-project__tail"><span></span></div>
            </div>
        </div>
    `,
        });

        L.marker(proj.coordinates, { icon: icon }).addTo(map);
    });

}