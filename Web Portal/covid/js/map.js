    function initMap() {
        var exists_latLng= $("#map_latLon").val();
        exists_latLng=exists_latLng.split(",");
        // console.log(parseFloat(exists_latLng[0]).toFixed(2))
        var lat=parseFloat(exists_latLng[0]).toFixed(2);
        var lng=parseFloat(exists_latLng[1]).toFixed(2);
        var latLon = {lat:parseFloat(lat) , lng:parseFloat(lng) };
        // console.log((latLon))

        // The map, centered at latLon
        var map = new google.maps.Map(
            document.getElementById('map'), {zoom: 8, center: latLon, scrollwheel: false,});
        // The marker, positioned at latLon
        var marker = new google.maps.Marker({
            position: latLon, map: map,
            draggable: true,
        });

        google.maps.event.addListener(marker, 'drag', function(event) {
            $("#map_latLon").val(event.latLng.lat()+","+event.latLng.lng());
                    // geocodeLatLng(geocoder, map, infowindow,marker);
        });

        google.maps.event.addListener(marker, 'dragend', function(event) {
            $("#map_latLon").val(event.latLng.lat()+","+event.latLng.lng());
                    geocodeLatLng(geocoder, map, infowindow,marker);
        });
        var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;

      geocodeLatLng(geocoder, map, infowindow);
    }

    function geocodeLatLng(geocoder, map, infowindow,marker) {
        var input = document.getElementById('map_latLon').value;
        var latlngStr = input.split(',', 2);
        latlngStr[0]=parseFloat(latlngStr[0]).toFixed(2)
        latlngStr[1]=parseFloat(latlngStr[1]).toFixed(2)
        // console.log(latlngStr[1])

        var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
        // console.log(latlng)
        geocoder.geocode({'location': latlng}, function(results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    // map.setZoom(11);
                    // var marker = new google.maps.Marker({
                    //     position: latlng,
                    //     map: map
                    // });
                    infowindow.setContent(results[0].formatted_address);
                    infowindow.open(map, marker);
                    // $("#map_full_address").val(results[0].formatted_address);
                    if($("#add-customer-form").is(":visible"))
                        $("#customer_address").val(results[0].formatted_address);
                    else if($("#add-site-form").is(":visible"))
                        $("#site_address").val(results[0].formatted_address);
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }