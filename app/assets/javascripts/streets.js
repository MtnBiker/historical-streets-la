"use strict";

// Called from show.html.erb and edit.html.erb
// First set up common variables, then function specific to each show and edit
// Used to be _map.initial.js.erb and _leafletmap.show.html.erb which may be able to delete TODO
// Declare global variables used by both functions
var map;
var previousLayer;
var opacitySlider; // global so works for remove
//URLs
var hamlin1908url = "https://api.mapbox.com/styles/v1/mtnbiker/cj3gnezpq00152rt5o6g3kyqp/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXRuYmlrZXIiLCJhIjoiNmI5ZmZjMzAyNzJhY2Q0N2ZlN2E1ZTdkZjBiM2I1MTUifQ.6R3ptz9ejWpxcdZetLLRqg",
    Hill1928aws    = 'https://crores.s3.amazonaws.com/tiles/1928Hills/{z}/{x}/{y}.png',
    baistDetailAws = 'https://crores.s3.amazonaws.com/tiles/baistDetail/{z}/{x}/{y}.png',
    baistKMaws     = "https://crores.s3.amazonaws.com/tiles/bkm/{z}/{x}/{y}.png",
    rueger1902aws  = "https://crores.s3.amazonaws.com/tiles/1902rueger/{z}/{x}/{y}.png",
    woods1908url   = "https://crores.s3.amazonaws.com/tiles/1908woods/{z}/{x}/{y}.png",
    sanborn1888km1aURL = "https://crores.s3.amazonaws.com/tiles/1888SanbornKM1a/{z}/{x}/{y}.png",
    sanborn1894km1aURL = "https://crores.s3.amazonaws.com/tiles/1894SanbornKM1a/{z}/{x}/{y}.png",
    osmUrl    = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        esriUrl   = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    googleUrl = 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}'
    // bingUrl = "baseMapUrl = new L.BingLayer('AtGe6-aWfp_sv8DMsQeQBgTVE0AaVI2WcT42hmv12YSO-PPROsm9_UvdRyL91jav, {type: 'Road'});"
    // bingUrl = "http://bing.com/maps/default.aspx?cp=34.05~118.25&lvl=12&style=r",
    // bingUrl = "https://dev.virtualearth.net/REST/v1/ Imagery/Map/resourcePath?queryParameters&key=AtGe6-aWfp_sv8DMsQeQBgTVE0AaVI2WcT42hmv12YSO-PPROsm9_UvdRyL91jav"

// Links for attribution
var osmLink  = '<a href="https://openstreetmap.org">OpenStreetMap</a>',
    osmCopy = '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    mapboxCopy = '<a href="https://www.mapbox.com/map-feedback/">Mapbox</a>',
    esriLink = '<a href="https://www.esri.com/">Esri</a>',
    mbLink   = '<a href="https://mapbox.com/">OpenStreetMap</a>',
    rumseyLink = '<a href="http://www.davidrumsey.com">The David Rumsey Map Collection</a>',
    csunLink = "",
    bigBlogMapLink = 'http://www.bigmapblog.com'

// Attribution
var osmAttrib = '&copy; ' + osmLink + ' Contributors',
    esriAttrib = "i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community" & + esriLink,
    mapboxAttrib = '&copy; ' + mapboxCopy + '&copy;' + osmCopy,
    mwAttrib ='https://thinkwhere.wordpress.com',
    rumseyAttrib = rumseyLink,
    csunAttrib = csunLink,
    bigBlogMapAttrib = bigBlogMapLink,
    hamlinAttrib = ""

// Putting together as a Leaftlet tileLayer. First variable is the URL of the tiles
var rueger1902Map = L.tileLayer(rueger1902aws,    {attribution: mapboxAttrib}),
    osmMap      = L.tileLayer(osmUrl,       {attribution: osmAttrib}),
    esriMap     = L.tileLayer(esriUrl,      {attribution: esriAttrib}),
    // bing        = L.tileLayer(bingUrl), // This approach doesn't seem to work, but the following does. bing is easier to read than OSM because many major street names don't show up in OSM
    bing = L.tileLayer.bing('AtGe6-aWfp_sv8DMsQeQBgTVE0AaVI2WcT42hmv12YSO-PPROsm9_UvdRyL91jav'),
    google      = L.tileLayer(googleUrl,      {attribution: 'Google'}),
    hill1928 = L.tileLayer(Hill1928aws,  {attribution: bigBlogMapAttrib, layers: 'Hill1928', maxZoom:18 }),
    baistDetail = L.tileLayer(baistDetailAws, {attribution: rumseyAttrib, layers: 'BaistDetail', maxZoom:19 }),
    baistKM     = L.tileLayer(baistKMaws,   {attribution: rumseyAttrib}),
    rueger1902  = L.tileLayer(rueger1902aws),
    hamlin1908   = L.tileLayer(hamlin1908url),
    woods1908    = L.tileLayer(woods1908url,  {attribution: rumseyAttrib, maxZoom:17 }),
    sanborn1894km1a = L.tileLayer(sanborn1894km1aURL,  {attribution: csunAttrib}),
    sanborn1888km1a = L.tileLayer(sanborn1888km1aURL,  {attribution: csunAttrib})

// Define layers for the Layer.control selector
// Now defined in Rails maps
// var overlayLayers = {
//     // "<span style='color: blue'>1921 Baist detail</span>"   : baistDetail,
//     // "<span style='color: blue'>1921 Baist Key Map</span>"  : baistKM,
//     "1921 Baist detail"   : baistDetail,
//     "1921 Baist Key Map"  : baistKM,
//     "1928 Hill"    : hill1928,
//     "1908 Wood"    : woods1908,
//     "1908 Hamlin"  : hamlin1908,
//     "1902 Rueger"  : rueger1902,
//     "1894 Sanborn" : sanborn1894km1a,
//     "1888 Sanborn" : sanborn1888km1a
// };
var baseLayers = {
    "<span style='color: green'>Bing</span>"               : bing,
    "<span style='color: orange'>OSM Street</span>"        : osmMap,
    "<span style='color: green' >ESRI Satellite</span>"    : esriMap,
    "<span style='color: green' >Google Satellite</span>"  : google
}

// One function for edit and one for show which is also used by edit
// For street > show. Used for show and called by editMap to get all the initial stuff
function showMap(popupText) {

  // Sets up map, but if there is a linestring defined will zoom to that in the next if statement
  // But need a baselayer and a overlayLayer for opacitySlider to load
  // Now trying to add the overlayLayer without L.control.activeLayers
  map = L.map('map', {zoomDelta: 0.25,
        zoomSnap: 0.25
  }).setView([34.05, -118.25], 13);
  // map = L.map('map', {
  //     center: new L.LatLng(34.05, -118.25),
  //     zoom: 13,
  //     layers: [osmMap, hill1928], // have to figure out how to make the second item a blank map. Probably need to find a more robust solution and actually figure out how to make it work right TODO. Need these layers for activeLayers to work [the error: "Control doesn't have any active base layer!"]
  //     zoomControl: true
  // });

  L.tileLayer.bing('AtGe6-aWfp_sv8DMsQeQBgTVE0AaVI2WcT42hmv12YSO-PPROsm9_UvdRyL91jav').addTo(map) // , {type: 'Road'} doesn't work, had to set in the leaflet-bing-layer.js
  L.control.layers(baseLayers).addTo(map);
  var streetExtentArray = gon.streetExtentArray; // works better with this even if repeated later. And this has to be in the function, not with the other var. gon not defined if outside. In the statement, the streetExtentArray only exists in the sense of gon.. must declare the var
    // console.log("191. typeof streetExtentArray = gon.streetExtentArray: " + typeof streetExtentArray);

// If linestring exists, draw it
  if (streetExtentArray != null && streetExtentArray.length > 2) {
    var arrayStreetExtent = JSON.parse(gon.streetExtentArray); // If not inside if, errors when streetExtentArray doesn't exist, but TODO seems to need to be reloaded to show page
    // console.log("121. arrayStreetExtent: " + arrayStreetExtent + ". typeOf: "+ arrayStreetExtent.typeOf);
    map.fitBounds(arrayStreetExtent); // zooms to area of interest
    L.polyline(arrayStreetExtent).addTo(map)
                                 .bindPopup(popupText).openPopup()
  ;

  // Shows zoom level which I find useful. Like to have in on the lower right
  // http://leafletjs.com/examples/zoom-levels/example-fractional.html
  var ZoomViewer = L.Control.extend({
  		onAdd: function(){
  			var container= L.DomUtil.create('div');
  			var gauge = L.DomUtil.create('div');
  			container.style.width = '200px';
  			container.style.background = 'rgba(255,255,255,0.5)';
  			container.style.textAlign = 'left';
  			map.on('zoomstart zoom zoomend', function(ev){
  				gauge.innerHTML = 'Zoom level: ' + map.getZoom();
  			})
  			container.appendChild(gauge);

  			return container;
  		}
  	});

  	(new ZoomViewer).addTo(map);
  } // end ZoomViewer

// Put the layer selection control on the map. Note that we need two `layers` from the map definition

  // The event handler for changing the display after the selection of an overlayLayer
  var addOpacitySlider = function(currentLayer) {

    // Create the opacity controls—the slider
    // Better if I can place opacitySlider to the right of the layer control, moot with Rails approach to overlayLayers
    opacitySlider = new L.Control.opacitySlider();
    map.addControl(opacitySlider);

    //Specify the layer for which you want to modify the opacity. Note that the setOpacityLayer() method applies to all the controls.
    //You only need to call it once.
    opacitySlider.setOpacityLayer(currentLayer);

    //Set initial opacity to 0.5 (Optional, but helps with understanding what one is seeing)
    currentLayer.setOpacity(0.5);
    previousLayer = currentLayer; // so can remove below. May be able to reorder the  $( "#select-overlay" ).change(function() to avoid having this extra variable. But first get it all working
  } // end addOpacitySlider

  // map.on('baselayerchange', function (event) {
  //   console.log("171. baselayerchange event.name: " + event.name);
  // });
  map.on('overlayadd', function (event) {
    // console.log("174. overlayadd event.name: " + event.name);
    var currentLayer = event.name;
    // console.log("179. currentLayer: " + currentLayer);  // 1921 Baist Key Map
    // control.remove(); // see http://leafletjs.com/reference-1.0.3.html#control, but didn't work here as I thought it might. Trying to kill bugs
    addOpacitySlider(currentLayer);
  });

  // Adding a listener to id="select-overlay". Remove the CONTROL, not layer if it exists and then add the selected layer.
  $( "#select-overlay" ).change(function() {
    // Get layer selected
    // console.log("148. Next line is $(#select-overlay input[type='radio']:checked. Some of the URLs aren't working")
    // console.log($("#select-overlay input[type='radio']:checked").val())

    var changeLayerTo = $("#select-overlay input[type='radio']:checked").val();
    var currentLayer = L.tileLayer(changeLayerTo).addTo(map)
    // $('.opacity_slider_control').is(':visible') ? console.log("206. Opacity slide is visible") : console.log("Opacity slide is NOT visible") // this test works how to deal with removing.
    if ($('.opacity_slider_control').is(':visible')) {
      previousLayer.setOpacity(0.0) // opacity doesn't quite right if just do the step below. Kluge, but it works. The opacity info is being saved somewhere and doesn't go away when the control is removed.
      opacitySlider.remove() // remove any existing opacitySlider and then add the new one in the next step
    }
    // $('.opacity_slider_control').is(':visible') ? opacitySlider.remove() : console.log("207. Opacity slide is NOT visible"); // opacitySlider not defined even if declared. if true. false works.
    // Tried to define the DOM as blank. Just made the slider non functional. Maybe didnt' quite have it:
    // opacity_slider_control ui-slider ui-corner-all ui-slider-vertical ui-widget ui-widget-content leaflet-control and their is not higher level div that is exclusive
    // opacitySlider.removeFrom(map) => opacitySlider.removeFrom is not a function
    // opacitySlider.remove() Sort of works, only one control, but opacity can't go to zero
    addOpacitySlider(currentLayer)
  });

}  // end showMap

// editMap. Streets > Edit. Note uses showMap
function editMap(popupText) {

  showMap(popupText); // showMap draws the map and adds control to select basemaps.

  // Now we add what's needed to draw the extent and save to database

  // Initialise the FeatureGroup to store editable layers
  var drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);

  // Initialise the draw control for only polyline and pass it the FeatureGroup of editable layers
  var drawControl = new L.Control.Draw({
    position: 'topleft',
    draw: {
      polyline :  true,
      marker:     false,
      polygon :   false,
      rectangle : false,
      circle :    false
    },
    edit: {
      featureGroup: drawnItems
    }
  }); // end drawControl
  map.addControl(drawControl);

  map.on('draw:created', function(e) {
    // featureGroup.addLayer(e.layer); // might be equivalent to the following two lines
    var type = e.layerType,
      layer = e.layer;

    // from https://gis.stackexchange.com/questions/133379/how-to-export-to-all-points-within-leaflet-polygon
    var points = layer._latlngs; // No longer needed, but shows alt way to get lat lng, need to check type
    console.log("202. Got to here.");
    console.log("203. type of layer._latlngs: " + typeof layer._latlngs); //object, what about string?
    console.log("type of points = to above: " + typeof points); //object

    // layer (the drawn line) as GeoJSON
    var geojson = layer.toGeoJSON();  // is an object Object
    // console.log("type of layer.toJSON: " + typeof geojson); // object
    console.log("209. JSON.stringify(geojson):\n" + JSON.stringify(geojson)) // maybe write to an json
    var latlngs = layer.getLatLngs(); // LatLng(34.04953, -118.29912),LatLng(34 etc.
    console.log("type of layer.getLatLngs(): " + typeof layer.getLatLngs() + ". But it displays as a partial JSON ()");
    console.log(latlngs);
    // export the coordinates from the layer
    var coordinates = [];
    latlngs = layer.getLatLngs();
    for (var i = 0; i < latlngs.length; i++) {
      coordinates.push("[" + [latlngs[i].lat, latlngs[i].lng] + "]")
    }
    console.log("coordinates: " + coordinates);
    // push the coordinates to the json geometry
    // geojson['geometry']['coordinates'] = [coordinates];

    // writes coordinate array into field on form ready for save
    $("#street_extent_array").val("[" + coordinates + "]");

    // Write GeoJSON to steet.extent_json for saving from the form. Not working, but not creating an error
    $("#street_extent_json").value = JSON.stringify(geojson);

    // Add the drawn line to a layer to display it in the map
    drawnItems.addLayer(layer);
  }); // end map.on

  $('map').imageMapResize();

}  // end editMap

// indexMap. Streets > big_map_html_erb. Note uses showMap
// TODO this needs to look more like map.js for crores where multiple items are being put up. May need to be on its own file or rework showMap since I do need the basemaps and overlays and opacity.
function indexMap(popupText) {

  showMap(popupText); // showMap draws the map and adds control to select basemaps.

  var extentLayer  = L.mapbox.featureLayer().loadURL('street/index_data.geojson').addTo(map);

} // end indexMap