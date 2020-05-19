var days=0;
var today = "2020"+"-"+"04"+"-"+"14" ;
$('#dateexpense').val(today);

$('#dateexpense').datepicker({
	autoclose: true,
	format: 'yyyy-mm-dd'
}).on("changeDate", function (e) 
{
dt1 = new Date("2020-04-14");
dt2 = new Date(document.getElementById("dateexpense").value);
days=Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
alert(days);
//////////////////////////////////////
serialized=$(".world-map-data").val();
locations=JSON.parse(serialized);
    $('.map-radio').each(function () {
        if(this.checked) {
            existing_color=$(this).attr("id");
        }
    });
    initMap(existing_color,84+days,167+days,250+days);
    
    
});
$('#dateexpense').datepicker('setEndDate',  new Date("2020, 4, 14"));
$('#dateexpense').datepicker('setStartDate', new Date("2020, 1, 22") );
var locations='';
var serialized=$(".world-map-data").val();
locations=JSON.parse(serialized);
$('.map-radio').change(function(){
    if(this.checked) {
        // console.log($(this).attr("id"))
        initMap($(this).attr("id"),84+days,167+days,250+days);
    }

});
function initMap(color,de,re,con) {
    var txt='';
    map = new google.maps.Map(document.getElementById('site-map'), {
        center: new google.maps.LatLng(19.3841955,20.4549299),
        zoom: 4,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        panControl: true,
        zoomControl: true,
        streetViewControl: true
    });
    bounds  = new google.maps.LatLngBounds();

    for (i = 0; i < locations.length; i++) {
        switch (color) {
            case 'red':
                txt=locations[i][de];
                break;
            case 'green':
                txt=locations[i][re];
                break;
            case 'yellow':
                txt=locations[i][con];
                break;
        }
        setPos(parseFloat(locations[i][0]), parseFloat(locations[i][1]),map,locations.length,color,txt,bounds);
    }
    //map.fitBounds(bounds);
    map.panToBounds(bounds);
}

function setPos(lat,lng,map,positions_length,color,txt,bounds) {
    // console.log(lat, lng, txt)

    if(!isNaN(lat) && !isNaN(lng)){
        marker = new RichMarker({
            map: map,
            position: new google.maps.LatLng(lat, lng),
            draggable: false,
            flat: true,
            anchor: RichMarkerPosition.MIDDLE,
            content: '<div class="text-center pin pin-'+color+'"><span>'+txt+'</span></div><div class="pin-'+color+'-effect"></div>'
        });
        loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
        bounds.extend(loc);
    }

}
google.maps.event.addDomListener(window, 'load', function () {
    this.initMap('yellow',84,167,250);
    $("input#yellow").attr('checked','checked');
});