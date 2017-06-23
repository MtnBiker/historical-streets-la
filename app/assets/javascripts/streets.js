"use strict";

// Called from show.html.erb in this trial (needs to be called from edit too)
// Used to be _map.initial.js.erb, but moved here since easier to debug and is "better" practice
// Called from _leafletmap.show.html.erb in the version before this
// Was function makeMap(dateEarliest, currentName, dateLatest, popupText) {
function makeMap(popupText) {
// Map tile URLs
var hamlin1908url = 'https://api.mapbox.com/styles/v1/mtnbiker/cj3gnezpq00152rt5o6g3kyqp/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXRuYmlrZXIiLCJhIjoiNmI5ZmZjMzAyNzJhY2Q0N2ZlN2E1ZTdkZjBiM2I1MTUifQ.6R3ptz9ejWpxcdZetLLRqg', 
  Hill1928aws =    'https://crores.s3.amazonaws.com/tiles/1928Hills/{z}/{x}/{y}.png',
  baistDetailAws = 'https://crores.s3.amazonaws.com/tiles/baistDetail/{z}/{x}/{y}.png', 
  baistKMaws     = "https://crores.s3.amazonaws.com/tiles/bkm/{z}/{x}/{y}.png",
  rueger1902aws  = "https://crores.s3.amazonaws.com/tiles/1902rueger/{z}/{x}/{y}.png",
  woods1908url   = "https://crores.s3.amazonaws.com/tiles/1908woods/{z}/{x}/{y}.png",
  sanborn1888km1aURL = "https://crores.s3.amazonaws.com/tiles/1888SanbornKM1a/{z}/{x}/{y}.png",
  sanborn1894km1aURL = "https://crores.s3.amazonaws.com/tiles/1894SanbornKM1a/{z}/{x}/{y}.png",
  osmUrl    = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      esriUrl   = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServe\
  r/tile/{z}/{y}/{x}',
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
  esriAttrib = 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP,\
and the GIS User Community & '+ esriLink,
  mapboxAttrib = '&copy; ' + mapboxCopy + '&copy;' + osmCopy,
  mwAttrib ='https://thinkwhere.wordpress.com',
  rumseyAttrib = rumseyLink,
  csunAttrib = csunLink,
  bigBlogMapAttrib = bigBlogMapLink,
  hamlinAttrib = ""
  
// Putting together as a Leaftlet tileLayer. First variable is the URL of the tiles
var rueger1902Map       = L.tileLayer(rueger1902aws,    {attribution: mapboxAttrib}),
    osmMap      = L.tileLayer(osmUrl,       {attribution: osmAttrib}),
    esriMap     = L.tileLayer(esriUrl,      {attribution: esriAttrib}),
    // bing        = L.tileLayer(bingUrl), // This approach doesn't seem to work, but the following does. bing is easier to read than OSM because many major street names don't show up in OSM
    bing = L.tileLayer.bing('AtGe6-aWfp_sv8DMsQeQBgTVE0AaVI2WcT42hmv12YSO-PPROsm9_UvdRyL91jav'),
    google      = L.tileLayer(googleUrl,      {attribution: 'Google'}),
    hill1928 = L.tileLayer(Hill1928aws,  {attribution: bigBlogMapAttrib}),
    baistDetail = L.tileLayer(baistDetailAws, {attribution: rumseyAttrib}),
    baistKM     = L.tileLayer(baistKMaws,   {attribution: rumseyAttrib}),
    rueger1902  = L.tileLayer(rueger1902aws),
    hamlin1908   = L.tileLayer(hamlin1908url),
    woods1908    = L.tileLayer(woods1908url,  {attribution: rumseyAttrib}),
    sanborn1894km1a = L.tileLayer(sanborn1894km1aURL,  {attribution: csunAttrib}),
    sanborn1888km1a = L.tileLayer(sanborn1888km1aURL,  {attribution: csunAttrib})
var overlayLayers = {
  "<span style='color: blue'>1921 Baist detail</span>"   : baistDetail,
  "<span style='color: blue'>1921 Baist Key Map</span>"  : baistKM,
  "1928 Hill"    : hill1928,
  "woods1908"    : woods1908,
  "1908 Hamlin"  : hamlin1908,
  "1902 Rueger"  : rueger1902,
  "1894 Sanborn" : sanborn1894km1a,
  "1888 Sanborn" : sanborn1888km1a
};
var baseLayers = {
  "<span style='color: green'>Bing</span>"               : bing,
  "<span style='color: orange'>OSM Street</span>"        : osmMap, 
  "<span style='color: green' >ESRI Satellite</span>"    : esriMap,
  "<span style='color: green' >Google Satellite</span>"  : google
}                             

// Sets up map, but if there is a segment defined will zoom to that in the next if statement
// Original. But need a baselayer and a overlayLayer for opacitySlider to load 
var map = L.map('map').setView([34.05, -118.25], 13,);
L.tileLayer.bing('AtGe6-aWfp_sv8DMsQeQBgTVE0AaVI2WcT42hmv12YSO-PPROsm9_UvdRyL91jav').addTo(map) // , {type: 'Road'} doesn't work, had to set in the leaflet-bing-layer.js
var streetExtentArray = gon.streetExtentArray; // works better with this even if repeated below
// console.log("99. typeof streetExtentArray = gon.streetExtentArray: " + typeof streetExtentArray);
var arrayStreetExtent = JSON.parse(gon.streetExtentArray);
// console.log("121. arrayStreetExtent: " + arrayStreetExtent + ". typeOf: "+ arrayStreetExtent.typeOf);
map.fitBounds(arrayStreetExtent); // zooms to area of interest
// L.polyline(arrayStreetExtent).addTo(map)
// .bindPopup("&le;" + dateEarliest + "<br>" + currentName + "<br>&ge;" + dateLatest); // Could have passed the whole statement as a variable which is tried out below and it worked. TODO can delete the first three variables.
L.polyline(arrayStreetExtent).addTo(map)
                             .bindPopup(popupText).openPopup(); 


}  // end makeMap

// ctrLayer = L.control.activeLayers(baseMaps, overlayMaps, {position: 'topright'}).addTo(map);
// .....
// tilemapLayer = ctrLayer.getActiveBaseLayer().layer;
// tilemapLayer.setOpacity(actualOpacityValue);


// editMap---trial to get into JS
function editMap(popupText) {
// Map tile URLs
var hamlin1908url = 'https://api.mapbox.com/styles/v1/mtnbiker/cj3gnezpq00152rt5o6g3kyqp/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXRuYmlrZXIiLCJhIjoiNmI5ZmZjMzAyNzJhY2Q0N2ZlN2E1ZTdkZjBiM2I1MTUifQ.6R3ptz9ejWpxcdZetLLRqg', 
  Hill1928aws =    'https://crores.s3.amazonaws.com/tiles/1928Hills/{z}/{x}/{y}.png',
  baistDetailAws = 'https://crores.s3.amazonaws.com/tiles/baistDetail/{z}/{x}/{y}.png', 
  baistKMaws     = "https://crores.s3.amazonaws.com/tiles/bkm/{z}/{x}/{y}.png",
  rueger1902aws  = "https://crores.s3.amazonaws.com/tiles/1902rueger/{z}/{x}/{y}.png",
  woods1908url   = "https://crores.s3.amazonaws.com/tiles/1908woods/{z}/{x}/{y}.png",
  sanborn1888km1aURL = "https://crores.s3.amazonaws.com/tiles/1888SanbornKM1a/{z}/{x}/{y}.png",
  sanborn1894km1aURL = "https://crores.s3.amazonaws.com/tiles/1894SanbornKM1a/{z}/{x}/{y}.png",
  osmUrl    = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      esriUrl   = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServe\
  r/tile/{z}/{y}/{x}',
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
  esriAttrib = 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP,\
and the GIS User Community & '+ esriLink,
  mapboxAttrib = '&copy; ' + mapboxCopy + '&copy;' + osmCopy,
  mwAttrib ='https://thinkwhere.wordpress.com',
  rumseyAttrib = rumseyLink,
  csunAttrib = csunLink,
  bigBlogMapAttrib = bigBlogMapLink,
  hamlinAttrib = ""
  
// Putting together as a Leaftlet tileLayer. First variable is the URL of the tiles
var rueger1902Map       = L.tileLayer(rueger1902aws,    {attribution: mapboxAttrib}),
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

var overlayLayers = {
  // "<span style='color: blue'>1921 Baist detail</span>"   : baistDetail,
  // "<span style='color: blue'>1921 Baist Key Map</span>"  : baistKM,
  "1921 Baist detail"   : baistDetail,
  "1921 Baist Key Map"  : baistKM,
  "1928 Hill"    : hill1928,
  "1908 Wood"    : woods1908,
  "1908 Hamlin"  : hamlin1908,
  "1902 Rueger"  : rueger1902,
  "1894 Sanborn" : sanborn1894km1a,
  "1888 Sanborn" : sanborn1888km1a
};
var baseLayers = {
  "<span style='color: green'>Bing</span>"               : bing,
  "<span style='color: orange'>OSM Street</span>"        : osmMap, 
  "<span style='color: green' >ESRI Satellite</span>"    : esriMap,
  "<span style='color: green' >Google Satellite</span>"  : google
}                             

// Sets up map, but if there is a segment defined will zoom to that in the next if statement
// Original. But need a baselayer and a overlayLayer for opacitySlider to load 
// var map = L.map('map').setView([34.05, -118.25], 13,);
// Experimenting with slider, FIXED TO hill1928. Not viable in general since an overlayLayer is preselected.
var map = L.map('map', {
    center: new L.LatLng(34.05, -118.25),
    zoom: 13,
    layers: [osmMap, hill1928], // have to figure out how to make the second item a blank map. Probably need to find a more robust solution and acturally figure out how to make it work right
    zoomControl: true
});
// gon is a gem which allows reading of gon. variables defined in the controller
// console.log("95. typeof gon.streetExtentArray: " + typeof gon.streetExtentArray);
// var streetExtentArray = new Array();
// console.log("97. typeof streetExtentArray= new Array();: " + typeof streetExtentArray); // => object
L.tileLayer.bing('AtGe6-aWfp_sv8DMsQeQBgTVE0AaVI2WcT42hmv12YSO-PPROsm9_UvdRyL91jav').addTo(map); // , {type: 'Road'} doesn't work, had to set in the leaflet-bing-layer.js
var streetExtentArray = gon.streetExtentArray; // works better with this even if repeated below
// console.log("191. typeof streetExtentArray = gon.streetExtentArray: " + typeof streetExtentArray);

if (streetExtentArray.length > 2) {
  var arrayStreetExtent = JSON.parse(gon.streetExtentArray); // If not inside if, errors when streetExtentArray doesn't exist, but TODO seems to need to be reloaded to show page
  // console.log("121. arrayStreetExtent: " + arrayStreetExtent + ". typeOf: "+ arrayStreetExtent.typeOf);
  map.fitBounds(arrayStreetExtent); // zooms to area of interest
  L.polyline(arrayStreetExtent).addTo(map)
                               .bindPopup(popupText).openPopup()
  ;
}

//   // Adds control to show other layers.
 // collapsed: false is good because reveals the option of selecting layers. Have it true because the opacity slider is buried by it.
// L.control.layers(baseLayers, overlayLayers).addTo(map); // null: so no overlays are being specified. Are overlays points, for example. Null needed or it doesn't work.

// console.log("113. baseLayers: " + baseLayers.to_string + ". overlayLayers: " + overlayLayers.to_string);
// if (baseLayers == "undefined" || overlayLayers == undefined) {
//   overlayLayers = "";
//   baseLayers = "";
//   console.log("118. got inside if"); // not happening with undefined in or out of quotes
//   // L.control.layers( baseLayers, overlayLayers).addTo(map); // Don't get controls. Maybe not in the if
//   L.control.activeLayers(baseLayers, overlayLayers).addTo(map); // Don't get controls. Maybe not in the if
// }
// L.control.layers( baseLayers, overlayLayers, {collapsed:true} ).addTo(map); // works and shows controls, but then what? Need to have transparency slider come on
L.control.activeLayers(baseLayers, overlayLayers).addTo(map); // Uncaught Error: Control doesn't have any active base layer! But may want to be in this mode

// The above is the initial display and then after selecting layer we get the opacity slider.
// Need to display with active layers once select a layer which must be trigged by an event.

// The event handler for changing the display after the selection of an overlayLayer
var addOpacitySlider = function(currentLayer) {
  console.log("218. Got into addOpacitySlider. currentLayer: " + currentLayer);
  // var control = L.control.activeLayers(baseLayers, overlayLayers).addTo(map); // simplier? Do I need control
  var control = L.control.activeLayers(baseLayers, overlayLayers);
  // control.addTo(map); // if add, get two controls, maybe need to clear the first one if need to add this one
  
  // console.log("224. control: " + control); // somewhat to say we got here
  // console.log("225. control.getActiveBaseLayer().name: " + control.getActiveBaseLayer().name);
  var overlayLayersX = control.getActiveOverlayLayers();
  // for (var overlayId in overlayLayersX) {
 //    console.log("228. overlayLayer: " + overlayLayersX[overlayId].name); // gets the "long" name including formatting (name is on left in definition)
 //    console.log("228. overlayLayer ID: " + overlayLayersX[overlayId]);
 //  }
  //
  // var overlayLayers = control.getActiveOverlayLayers()
  // for (var overlayId in overlayLayers) {
  //     console.log("overlayLayer: " + overlayLayers[overlayId].name)
  // }
  //
  //
  // //Create the opacity controls—the slider
  // // Better if I can place opacitySlider to the right of the layer control
  // // Only needs to be loaded after select a layer, so some on.xxx
  var opacitySlider = new L.Control.opacitySlider(); // ,{position: 'bottomright'} Works but maybe too hard to see
  map.addControl(opacitySlider);
  //
  // //Specify the layer for which you want to modify the opacity. Note that the setOpacityLayer() method applies to all the controls.
  // //You only need to call it once.
  // console.log("237. overlayLayer: " + overlayLayers[overlayId].name)
switch (currentLayer) {
  case "1921 Baist detail":
    currentLayer = baistDetail;
    break;
  case "<span style='color: blue'>1921 Baist detail</span>":
    currentLayer = baistDetail;
    break;
  case "<span style='color: blue'>1921 Baist Key Map</span>":
    currentLayer = baistKM;
    break;
  case "1921 Baist Key Map":
    currentLayer = baistKM;
    break;
  case "1928 Hill":
    currentLayer = hill1928;
    break;
  case "1908 Wood":
    currentLayer = woods1908;
    break;
  case "1908 Hamlin":
    currentLayer = hamlin1908;
    break;
  case "1902 Rueger":
    currentLayer = rueger1902;
    break;
  case "1894 Sanborn":
    currentLayer = sanborn1894km1a;
    break;
  case "1888 Sanborn":
    currentLayer = sanborn1888km1a;
    break;
  default:
    currentLayer = baistKM;
    break;
}
  opacitySlider.setOpacityLayer(currentLayer); // overlayLayers: opacity_layer.setOpacity is not a function. All the layers are sent, need to just have the selected layer

  //Set initial opacity to 0.5 (Optional)
  // overlayLayers.setOpacity(0.5);
}

map.on('baselayerchange', function (event) {
  // Returns 'CartoDB Positron' or 'CartoDB Dark Matter'
  console.log("257. baselayerchange event.name: " + event.name);
});
map.on('overlayadd', function (event) {
  // Returns 'CartoDB Positron' or 'CartoDB Dark Matter'
  console.log("261. overlayadd event.name: " + event.name);
  var currentLayer = event.name;
  addOpacitySlider(currentLayer);
});

// map.on('overlayadd', addOpacitySlider); // http://leafletjs.com/reference-1.0.3.html#map-baselayerchange

}  // end editMap
