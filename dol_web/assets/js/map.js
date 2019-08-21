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

function zoom_to_prov_code(prov_code){
    $.ajax({ 
        type: 'GET', 
        url: 'http://192.168.19.14:8000/bbox/nsl_par?prov_code='+prov_code, 
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
}

function zoom_to_nsl_id(nsl_id){
    $('#modal-datatable').modal('hide')
    $.ajax({ 
        type: 'GET', 
        url: 'http://192.168.19.14:8000/bbox/nsl_par?nsl_id='+nsl_id, 
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
}

$('#province').on('change', function() {
    zoom_to_prov_code(this.value)
});

$('#btn-s-nsl_id').on('click', function() {
    var val = $('#s-nsl_id').val()
    zoom_to_nsl_id(val)
});

var map = new mapboxgl.Map({
    container: 'map',
    style: 'http://192.168.19.14:82/styles/osm-bright/style.json',
    zoom: 6,
    center: [100.5408628,13.9057852]
    });

map.on('load', function() {
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

    map.on('click', 'nsl_parcel', function (e) {
        var param = e.features[0]["properties"]["F1"]
        $.ajax({ 
            type: 'GET', 
            url: 'http://192.168.19.14:8000/table/nsl_par?nsl_id='+param, 
            dataType: 'json',
            success: function (data) {
                console.log(data)

                html =  "<table>"
                html += "   <tr>"
                html += "        <th>เลขแปลง</th>"
                html += "        <th>"+data["data"][0]["f1"]+"</th>"
                html += "    </tr>"
                html += "   <tr>"
                html += "        <th>ชื่อแปลงที่ดิน</th>"
                html += "        <th>"+data["data"][0]["nsl_name"]+"</th>"
                html += "    </tr>"
                html += "    <tr>"
                html += "        <td>เอกสารสิทธ์</td>"
                html += "        <td><a target='_blank' href='http://192.168.19.14/nsl_pdf/"+data["data"][0]["f1_e"]+".pdf'>Download</a></td>"
                html += "    </tr>"
                html += "</table>"

                $("#detailBody").html(html);

                $('#modal-detail').modal('toggle');
                
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

$('#btn-s-nsl_name').on('click', function() {
    var val = $('#s-nsl_name').val()
    $('#datatable_1').DataTable( {
        "ajax": 'http://192.168.19.14:8000/table/nsl_par?nsl_name='+val
        ,"destroy": true
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
            { data: 'f1' 
                ,"render" : function(data, type, row, meta){
                return "<a href='#' onClick='zoom_to_nsl_id("+'"'+row["f1"]+'"'+")' >Zoom To</a>"
                }
            } 
        ]
    });
    $('#modal-datatable').modal('toggle');
})

$('#province-toggle').change(function() {
    var toggle = $(this).prop('checked')

    if (toggle){
        map.setLayoutProperty("province", 'visibility', 'visible');
    }else{
        map.setLayoutProperty("province", 'visibility', 'none');
    }
})

$('#nsl-toggle').change(function() {
    var toggle = $(this).prop('checked')

    if (toggle){
        map.setLayoutProperty("nsl_parcel", 'visibility', 'visible');
    }else{
        map.setLayoutProperty("nsl_parcel", 'visibility', 'none');
    }
})
