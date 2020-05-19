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
    initMap(existing_color,2);
    
    
});
$('#dateexpense').datepicker('setEndDate',  new Date("2020, 4, 14"));
$('#dateexpense').datepicker('setStartDate', new Date("2020, 1, 22") );
var locations='';
var serialized=$(".world-map-data").val();
locations=JSON.parse(serialized);
$('.map-radio').change(function(){
    if(this.checked) {
        // console.log($(this).attr("id"))
        initMap($(this).attr("id"),2);
    }

});
function initMap(color,de) {
//alert(16);
    var txt='';
    map = new google.maps.Map(document.getElementById('site-map'), {
        center: new google.maps.LatLng(39.4699646134845, -105.90399110527),
        zoom: 9,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        panControl: true,
        zoomControl: true,
        streetViewControl: true
    });
    bounds  = new google.maps.LatLngBounds();
    for (i = 0; i < locations.length; i++) {
        switch (locations[i][de]) {
        case "A":
        	color='yellow'; break;
    	case "B":
    		color='blue'; break;
    	case "C":
    		color='green'; break;
    	case "D":
    		color='red'; break;
    	case "E":
    		color='pink'; break;
    	case "LockDown Area":
    	case "None-LockDown Area":
    	color='purple'; break;
    	}
        setPos(parseFloat(locations[i][0]), parseFloat(locations[i][1]),map,locations.length,color,locations[i][de],bounds);
    }
    //map.fitBounds(bounds);
    //map.panToBounds(bounds);
}

function setPos(lat,lng,map,positions_length,color,txt,bounds) {
	var url = "https://www.google.com/intl/en_us/mapfiles/ms/micons/";
		url += color + "-dot.png";
	 
		
    if(!isNaN(lat) && !isNaN(lng))
    {
    	if(txt=='LockDown Area')
    	{
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(lat, lng),
				icon: {
				path: google.maps.SymbolPath.CIRCLE,
		        scale: 38.5,
		        fillColor: "#F00",
		        fillOpacity: 0.4,
		        strokeWeight: 0.4
				},
				draggable: true,
				label: {
				    text: txt,
				    color: 'black',
				    fontSize: "16px",
				    	fontWeight: "bold"
				  },
				map: map
			});
    	}
    	else if(txt=='None-LockDown Area')
    	{
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(lat, lng),
				icon: {
				path: google.maps.SymbolPath.CIRCLE,
		        scale: 38.5,
		        fillColor: "#0F0",
		        fillOpacity: 0.4,
		        strokeWeight: 0.4
				},
				draggable: true,
				label: {
				    text: txt,
				    color: 'black',
				    fontSize: "16px",
				    	fontWeight: "bold"
				  },
				map: map
			});
    	}
    	else
    	{
	        marker = new google.maps.Marker({
	            map: map,
	            position: new google.maps.LatLng(lat, lng),
	            draggable: false,
	            flat: true,
	            label: txt,
	            icon: {
				      url: url,
				    }
	        });
    	}
        
    }
}
google.maps.event.addDomListener(window, 'load', function () {
    this.initMap('yellow',2);
    $("input#yellow").attr('checked','checked');
});