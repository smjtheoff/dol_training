$(document).ready(function() {
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'http://192.168.19.14:82/styles/osm-bright/style.json',
        zoom: 6,
        center: [100.5408628,13.9057852]
        });
    
    map.on('load', function() {
        map.addLayer({
            "id" : "nsl_parcel",
            "type": "fill",
            "source": {
                "type": "vector",
                "tiles": ["http://192.168.19.14:81/data/nsl_parcel/{z}/{x}/{y}.pbf"],
                "minzoom": 4,
                "maxzoom": 14
            },
            "source-layer": "nsl_parcel",
            "paint": {
                "fill-color": "rgba(245, 180, 180, 0.27)",
                "fill-outline-color": "rgba(177, 145, 52, 1)"
            }
        });

        map.on('click', 'nsl_parcel', function (e) {
            console.log(e.features[0])
        });

        map.on('mouseenter', 'nsl_parcel', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
            
        map.on('mouseleave', 'nsl_parcel', function () {
            map.getCanvas().style.cursor = '';
        });
    });

    map.addControl(new mapboxgl.NavigationControl());
});