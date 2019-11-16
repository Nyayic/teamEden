function invetex_googlemap_init(dom_obj, coords) {
    "use strict";
    if (typeof INVETEX_STORAGE['googlemap_init_obj'] == 'undefined') invetex_googlemap_init_styles();
    INVETEX_STORAGE['googlemap_init_obj'].geocoder = '';
    try {
        var id = dom_obj.id;
        INVETEX_STORAGE['googlemap_init_obj'][id] = {
            dom: dom_obj,
            markers: coords.markers,
            geocoder_request: false,
            opt: {
                zoom: coords.zoom,
                center: null,
                scrollwheel: false,
                scaleControl: false,
                disableDefaultUI: false,
                panControl: true,
                zoomControl: true, //zoom
                mapTypeControl: false,
                streetViewControl: false,
                overviewMapControl: false,
                styles: INVETEX_STORAGE['googlemap_styles'][coords.style ? coords.style : 'default'],
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
        };

        invetex_googlemap_create(id);

    } catch (e) {

        dcl(INVETEX_STORAGE['strings']['googlemap_not_avail']);

    };
}

function invetex_googlemap_create(id) {
    "use strict";

    // Create map
    INVETEX_STORAGE['googlemap_init_obj'][id].map = new google.maps.Map(INVETEX_STORAGE['googlemap_init_obj'][id].dom, INVETEX_STORAGE['googlemap_init_obj'][id].opt);

    // Add markers
    for (var i in INVETEX_STORAGE['googlemap_init_obj'][id].markers)
        INVETEX_STORAGE['googlemap_init_obj'][id].markers[i].inited = false;
    invetex_googlemap_add_markers(id);

    // Add resize listener
    jQuery(window).resize(function() {
		"use strict";
        if (INVETEX_STORAGE['googlemap_init_obj'][id].map)
            INVETEX_STORAGE['googlemap_init_obj'][id].map.setCenter(INVETEX_STORAGE['googlemap_init_obj'][id].opt.center);
    });
}

function invetex_googlemap_add_markers(id) {
    "use strict";
    for (var i in INVETEX_STORAGE['googlemap_init_obj'][id].markers) {

        if (INVETEX_STORAGE['googlemap_init_obj'][id].markers[i].inited) continue;

        if (INVETEX_STORAGE['googlemap_init_obj'][id].markers[i].latlng == '') {

            if (INVETEX_STORAGE['googlemap_init_obj'][id].geocoder_request !== false) continue;

            if (INVETEX_STORAGE['googlemap_init_obj'].geocoder == '') INVETEX_STORAGE['googlemap_init_obj'].geocoder = new google.maps.Geocoder();
            INVETEX_STORAGE['googlemap_init_obj'][id].geocoder_request = i;
            INVETEX_STORAGE['googlemap_init_obj'].geocoder.geocode({
                address: INVETEX_STORAGE['googlemap_init_obj'][id].markers[i].address
            }, function(results, status) {
                "use strict";
                if (status == google.maps.GeocoderStatus.OK) {
                    var idx = INVETEX_STORAGE['googlemap_init_obj'][id].geocoder_request;
                    if (results[0].geometry.location.lat && results[0].geometry.location.lng) {
                        INVETEX_STORAGE['googlemap_init_obj'][id].markers[idx].latlng = '' + results[0].geometry.location.lat() + ',' + results[0].geometry.location.lng();
                    } else {
                        INVETEX_STORAGE['googlemap_init_obj'][id].markers[idx].latlng = results[0].geometry.location.toString().replace(/\(\)/g, '');
                    }
                    INVETEX_STORAGE['googlemap_init_obj'][id].geocoder_request = false;
                    setTimeout(function() {
                        invetex_googlemap_add_markers(id);
                    }, 200);
                } else
                    dcl(INVETEX_STORAGE['strings']['geocode_error'] + ' ' + status);
            });

        } else {

            // Prepare marker object
            var latlngStr = INVETEX_STORAGE['googlemap_init_obj'][id].markers[i].latlng.split(',');
            var markerInit = {
                map: INVETEX_STORAGE['googlemap_init_obj'][id].map,
                position: new google.maps.LatLng(latlngStr[0], latlngStr[1]),
                clickable: INVETEX_STORAGE['googlemap_init_obj'][id].markers[i].description != ''
            };
            if (INVETEX_STORAGE['googlemap_init_obj'][id].markers[i].point) markerInit.icon = INVETEX_STORAGE['googlemap_init_obj'][id].markers[i].point;
            if (INVETEX_STORAGE['googlemap_init_obj'][id].markers[i].title) markerInit.title = INVETEX_STORAGE['googlemap_init_obj'][id].markers[i].title;
            INVETEX_STORAGE['googlemap_init_obj'][id].markers[i].marker = new google.maps.Marker(markerInit);

            // Set Map center
            if (INVETEX_STORAGE['googlemap_init_obj'][id].opt.center == null) {
                INVETEX_STORAGE['googlemap_init_obj'][id].opt.center = markerInit.position;
                INVETEX_STORAGE['googlemap_init_obj'][id].map.setCenter(INVETEX_STORAGE['googlemap_init_obj'][id].opt.center);
            }

            // Add description window
            if (INVETEX_STORAGE['googlemap_init_obj'][id].markers[i].description != '') {
                INVETEX_STORAGE['googlemap_init_obj'][id].markers[i].infowindow = new google.maps.InfoWindow({
                    content: INVETEX_STORAGE['googlemap_init_obj'][id].markers[i].description
                });
                google.maps.event.addListener(INVETEX_STORAGE['googlemap_init_obj'][id].markers[i].marker, "click", function(e) {
					"use strict";
                    var latlng = e.latLng.toString().replace("(", '').replace(")", "").replace(" ", "");
                    for (var i in INVETEX_STORAGE['googlemap_init_obj'][id].markers) {
                        if (latlng == INVETEX_STORAGE['googlemap_init_obj'][id].markers[i].latlng) {
                            INVETEX_STORAGE['googlemap_init_obj'][id].markers[i].infowindow.open(
                                INVETEX_STORAGE['googlemap_init_obj'][id].map,
                                INVETEX_STORAGE['googlemap_init_obj'][id].markers[i].marker
                            );
                            break;
                        }
                    }
                });
            }

            INVETEX_STORAGE['googlemap_init_obj'][id].markers[i].inited = true;
        }
    }
}

function invetex_googlemap_refresh() {
    "use strict";
    for (id in INVETEX_STORAGE['googlemap_init_obj']) {
        invetex_googlemap_create(id);
    }
}

function invetex_googlemap_init_styles() {
	"use strict";
    // Init Google map
    INVETEX_STORAGE['googlemap_init_obj'] = {};
    INVETEX_STORAGE['googlemap_styles'] = {
        'default': []
    };
    if (window.invetex_theme_googlemap_styles !== undefined)
        INVETEX_STORAGE['googlemap_styles'] = invetex_theme_googlemap_styles(INVETEX_STORAGE['googlemap_styles']);
}