$(document).ready(function() {
    $.ajax({ 
        type: 'GET', 
        url: 'http://192.168.19.14:8000/list/province', 
        dataType: 'json',
        success: function (data) { 
            $.each(data["data"], function(key, value) {   
                $('#province')
                    .append($("<option></option>")
                    .attr("value",value["prov_code"])
                    .text(value["prov_nam_t"])); 
           });
        }
    });
});

$('#province').on('change', function() {
    $.ajax({ 
        type: 'GET', 
        url: 'http://192.168.19.14:8000/bbox/nsl_par?prov_code='+this.value, 
        dataType: 'json',
        success: function (data) { 
            map.fitBounds([[
                data["XMin"],
                data["YMin"],
                ], [
                data["XMax"],
                data["YMax"],
            ]]);
        }
    });
});

$('#btn-s-nsl_id').on('click', function() {
    var val = $('#s-nsl_id').val()
    $.ajax({ 
        type: 'GET', 
        url: 'http://192.168.19.14:8000/bbox/nsl_par?nsl_id='+val, 
        dataType: 'json',
        success: function (data) {
            if (data["XMin"] != null){
                map.fitBounds([[
                    data["XMin"],
                    data["YMin"],
                    ], [
                    data["XMax"],
                    data["YMax"],
                ]]);
            }
        }
    });
});

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
            "tiles": ["http://192.168.19.14:84/nsl_parcel/{z}/{x}/{y}"],
            "minzoom": 4,
            "maxzoom": 14
        },
        "source-layer": "nsl_parcel",
        "paint": {
            "fill-color": "rgba(245, 180, 180, 0.27)",
            "fill-outline-color": "rgba(177, 145, 52, 1)"
        }
    });

    map.addLayer({
        "id" : "province",
        "type": "fill",
        "source": {
            "type": "vector",
            "tiles": ["http://192.168.19.14:84/province/{z}/{x}/{y}"],
            "minzoom": 4,
            "maxzoom": 14
        },
        "source-layer": "province",
        "paint": {
            "fill-color": "rgba(245, 180, 180, 0.27)",
            "fill-outline-color": "rgba(177, 145, 52, 1)"
        }
    });

    map.on('click', 'nsl_parcel', function (e) {
        var param = e.features[0]["properties"]["F1"]
        $.ajax({ 
            type: 'GET', 
            url: 'http://192.168.19.14:8000/table/nsl_par?nsl_id='+param, 
            dataType: 'json',
            success: function (data) {
                console.log(data)
            }
        });
    });

    map.on('mouseenter', 'nsl_parcel', function () {
        map.getCanvas().style.cursor = 'pointer';
    });
        
    map.on('mouseleave', 'nsl_parcel', function () {
        map.getCanvas().style.cursor = '';
    });
});

map.addControl(new mapboxgl.NavigationControl());

$('#btn-datatable').on('click', function() {
    $('#datatable_1').DataTable( {
        "ajax": 'http://192.168.19.14:8000/table/nsl_par?tambon_idn=400101'
        ,columns: [
            { data: "nsl_no" },
            { data: "nsl_name" },
            { data: "rai" },
            { data: "ngan" },
            { data: "wa" },
            { data: "type" },
            { data: "f1" },
            { data: "f2" },
            { data: "province" },
            { data: "nsl_name_e" },
            { data: "prov_nam_e" },
            { data: "prov_nam_t" },
            { data: "f1_e" },
            { data: "tam_nam_t" },
            { data: "amphoe_t" },
            { data: "amphoe_e" },
        ]
    });
    $('#modal-datatable').modal('toggle');
})
