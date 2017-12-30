"use strict";

// .erb to process Ruby MAPBOX_TOKEN with ENV. Removed .erb 2017.10.11 since not using MapBox
// Called from show.html.erb and edit.html.erb and maybe new.html.erb
// First set up common variables, then function specific to each show and edit
// Used to be _map.initial.js.erb and _leafletmap.show.html.erb which may be able to delete TODO
// Declare global variables used by both functions
let map;
// var bing;
var imagerySet = "Road"; // AerialWithLabels | Birdseye | BirdseyeWithLabels | Road -- select one forBing map. Using this with L.BingLayer. Could use with L.tileLayer.bing too
let previousLayer;
let opacitySlider; // global so works for remove
let mapID;
let changeLayerTo;
// L.mapbox.accessToken = "<%= ENV["MAPBOX_TOKEN"] %>"; // error because maybe Mapbox isn't setup yet. The Ruby works even when (jS) commented out
//URLs. I'm not sure these are used anymore. See Map list
var Hill1928aws    = 'https://crores.s3.amazonaws.com/tiles/1928Hills/{z}/{x}/{y}.png',
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
    // bing        = L.tileLayer(bingUrl), // This approach doesn't seem to work, but the following two do. bing is easier to read than OSM because many major street names don't show up in OSM
    bing = new L.BingLayer("AtGe6-aWfp_sv8DMsQeQBgTVE0AaVI2WcT42hmv12YSO-PPROsm9_UvdRyL91jav", {type: imagerySet}), // both this and the following work. 
    // bing = L.tileLayer.bing('AtGe6-aWfp_sv8DMsQeQBgTVE0AaVI2WcT42hmv12YSO-PPROsm9_UvdRyL91jav'), // Road may be default
    google      = L.tileLayer(googleUrl,      {attribution: 'Google'}),
    hill1928 = L.tileLayer(Hill1928aws,  {attribution: bigBlogMapAttrib, layers: 'Hill1928', maxZoom:18 }),
    baistDetail = L.tileLayer(baistDetailAws, {attribution: rumseyAttrib, layers: 'BaistDetail', maxZoom:19 }),
    baistKM     = L.tileLayer(baistKMaws,   {attribution: rumseyAttrib}),
    rueger1902  = L.tileLayer(rueger1902aws),
    // hamlin1908   = L.tileLayer(hamlin1908url),
    // hamlin1908   = L.mapbox.styleLayer('mtnbiker.ng4kio7i'),
    // hamlin1908   = L.mapbox.map('map', 'mtnbiker.ng4kio7i'),
    woods1908    = L.tileLayer(woods1908url,  {attribution: rumseyAttrib, maxZoom:17 }),
    sanborn1894km1a = L.tileLayer(sanborn1894km1aURL,  {attribution: csunAttrib}),
    sanborn1888km1a = L.tileLayer(sanborn1888km1aURL,  {attribution: csunAttrib})

    var baseLayers = {
    "<span style='color: green'>Bing</span>"               : bing,
    "<span style='color: orange'>OSM Street</span>"        : osmMap,
    "<span style='color: green' >ESRI Satellite</span>"    : esriMap,
    "<span style='color: green' >Google Satellite</span>"  : google
}

// ############################################################################################
// One function for edit and one for show. editMap is added to the bottom of showMap
// For street > show. Used for show and called by editMap and overviewMap to get all the initial stuff
// Used also by overviewMap
function showMap(popupText) {

  // Sets up map, but if there is a linestring defined will zoom to that in the next if statement
  // But need a baselayer and a overlayLayer for opacitySlider to load
  // Now trying to add the overlayLayer without L.control.activeLayers
  map = L.map('map', {zoomDelta: 0.25,
                      zoomSnap: 0.25
  }).setView([34.05, -118.25], 13);

  // osmMap.addTo(map); // trial to se how worked with overlayLayers. I prefer Bing since it's cleaner
  bing.addTo(map); // Makes Bing load with intial page load. Doesn't matter after that. Maybe L.control.layers doesn't load anything. May not show without reload. Previously had the whole definition of bing here; particularly if no map to show, i.e., segment not defined. NO: may want to look around map before editing. Commented out to see if helped with change of baselayer covering overlay-made not difference.
  L.control.layers(baseLayers).addTo(map); // baseLayers defined about ten lines above

  var streetExtentArray = gon.streetExtentArray; // works better with this even if repeated later. And this has to be in the function, not with the other var. gon not defined if outside. In the statement, the streetExtentArray only exists in the sense of gon.
  var streetExtentJson = gon.streetExtentJson; // is this needed? Yes, otherwise streetExtentJson is undefined below and it's used several times, so worth declaring. True even if just declare `var streetExtensionJson;`

// Don't want to do the following for overviewMap. A bit of a work around since calling this for overview
  if (streetExtentArray != undefined || streetExtentJson != undefined) {
    // If linestring exists, draw it. this is for edit and show, but not overview
    // But also have to pick between streetExtentArray and streetExtentJson (should be able to eliminate streetExtentArray when data all in streetExtentJson. I had both because had trouble getting one or the other working.)
    if (streetExtentJson != null && streetExtentJson.length > 2) {
      var streetExtentJson = JSON.parse(streetExtentJson); // without this "Invalid GeoJSON object." Even though look the same.
      var geojsonLayer = L.geoJSON(streetExtentJson).addTo(map).bindPopup(popupText).openPopup();
      map.fitBounds(geojsonLayer.getBounds()); // this is in place of fitBounds which doesn't work with GeoJSON because of the lat lng transposition
    } else { 
      if (streetExtentArray != undefined && streetExtentArray.length > 2)
        { // can get rid of this when done with streetExtentArray
      var arrayStreetExtent = JSON.parse(gon.streetExtentArray);
      map.fitBounds(arrayStreetExtent); // zooms to area of interest
      L.polyline(arrayStreetExtent).addTo(map).bindPopup(popupText).openPopup();
    } // end if(streetExtentArray…/json)
  } // end if (streetExtentArray != undefined |...
};

  // Shows zoom level which I find useful. Like to have in on the lower right
  // http://leafletjs.com/examples/zoom-levels/example-fractional.html
  var ZoomViewer = L.Control.extend(
    {
  		onAdd: function()
        {
          var container= L.DomUtil.create('div');
          var gauge = L.DomUtil.create('div');
          container.style.width = '200px';
          container.style.background = 'rgba(255,255,255,0.5)';
          container.style.textAlign = 'left';
          map.on('zoomstart zoom zoomend', function(ev)
          {
          	gauge.innerHTML = 'Zoom level: ' + map.getZoom();
          })
          container.appendChild(gauge);

          return container;
        }
  	}); // end ZoomViewer
  	(new ZoomViewer).addTo(map); // unknown to me syntax  TODO, not currently showing up

// Put the layer selection control on the map. Note that we need two `layers` from the map definition
  // The event handler for changing the display after the selection of an overlayLayer?? Is this comment orphaned?

};  // end showMap

// #############################################################################################
// editMap. Streets > Edit. Note uses showMap, essentially editMap is added to the bottom of showMap
function editMap(popupText) {

  showMap(popupText); // showMap draws the map and adds control to select basemaps.

  // Now we add what's needed to draw the extent and save to database
// https://github.com/michaelguild13/Leaflet.draw
// https://github.com/Leaflet/Leaflet.draw/wiki/API-Reference#ldrawhandlers
  // Initialise the FeatureGroup to store editable layers
  var drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);

  // Initialise the draw control for only polyline and pass it the FeatureGroup of editable layers
  var drawControl = new L.Control.Draw({
    position: 'topleft',
    draw: {
      polyline :{
        metric: true // not sure what this is, same as if just `polyline : true,`
      },
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
  // finished adding drawing controls

  map.on('draw:created', function(e) {
    // featureGroup.addLayer(e.layer); // might be equivalent to the following two lines
    var type = e.layerType,
      layer = e.layer;

   var geojson = layer.toGeoJSON();  // is an object Object, therefore stringify below.

    // Write GeoJSON to steet.extent_json for saving from the form.
    $("#street_extent_json").val(JSON.stringify(geojson.geometry));
    // This GeoJSON seems contorted. why not using featureGroup (not the same as GeoJSON feature) or drawnItems instead of layer. Why go val(JSON.stringify(layer.toGeoJSON))? Maybe stringify is needed. I think I'm getting the right result though

    // Add the drawn line to a layer to display it in the map.
    drawnItems.addLayer(layer);
  }); // end map.on

  $('map').imageMapResize();

};  // end editMap

// ######################
// All the segments shown on one map
function overviewMap() {

  showMap(); // showMap draws the map and adds control to select basemaps.

// The popup shows with just this , no bindPopup or openPopup
  
  var segmentLayer = L.mapbox.featureLayer().loadURL('overview/overview_data.geojson').addTo(map);
  
  // Getting out of mapbox into Leaflet so can work with color, etc.
  // var data = loadURL('overview/overview_data.geojson');
  // L.geoJSON(data, {
  //     style: function (feature) {
  //         return {color: 'red'};
  //     }
  // }).bindPopup(function (layer) {
  //     return layer.feature.properties.description;
  // }).addTo(map);
    
  // May need to openPopup. Read the following and ??
  // https://gis.stackexchange.com/questions/111410/display-a-link-in-a-popup-with-leaflet
  // https://gis.stackexchange.com/questions/229723/how-to-display-properties-of-geojson-in-popup-on-leaflet
  
  // L.mapbox.featureLayer().loadURL('overview/overview_data.geojson').addTo(map).bindPopup(feature.properties.title).openPopup();
 
}; // end overviewMap

//  #############################
$(document).ready(function() {
  // Adding overlays. This doesn't happen until one of the overlays is selected.
  // The selection menu is installed with show map however, otherwise there would be nothing to change.

  // Adding a listener to id="select-overlay". Remove the CONTROL, not layer if it exists and then add the selected layer.
  $( "#select-overlay" ).change(function() {
    // Get layer selected. Identify by map.id as set in _overlay_selector.html.erb    
    mapID = $("#select-overlay input[type='radio']:checked").val();
    // console.log(`232. mapID (map.id): ${mapID}`);
    
    $.getJSON('maps.json', function(json) {
      $.each(json, function(map, mapInfo) {
        if (mapInfo.maps.id == mapID) {
          console.log(`mapID: ${mapID}`)
          changeLayerTo = mapInfo.maps.url;
          console.log(changeLayerTo);
          var mapZoom = mapInfo.maps.zoom;
          console.log(mapZoom);
        } 
      });
    });
    let currentLayer = L.tileLayer(changeLayerTo).addTo(map);
    map.setZoom(mapZoom); // not working yet.
    // $('.opacity_slider_control').is(':visible') ? console.log("206. Opacity slide is visible") : console.log("Opacity slide is NOT visible") // this test works how to deal with removing.
    // console.log("229. currentLayer: " + currentLayer);
    let addOpacitySlider = function(currentLayer) { // current layer is defined below. Say what?

      // Create the opacity controls—the slider
      // Better if I can place opacitySlider to the right of the layer control, moot with Rails approach to overlayLayers
      opacitySlider = new L.Control.opacitySlider();
      map.addControl(opacitySlider);

      // Specify the layer for which you want to modify the opacity. 
      // Note that the setOpacityLayer() method applies to all the controls.
      // You only need to call it once.
      opacitySlider.setOpacityLayer(currentLayer);

      //Set initial opacity to 0.5 (Optional, but helps with understanding what one is seeing)
      currentLayer.setOpacity(0.5);
      previousLayer = currentLayer; // so can remove below. May be able to reorder the  $( "#select-overlay" ).change(function() to avoid having this extra variable. But first get it all working
    } // end addOpacitySlider
    
    // This is bringing the overlay map on top, otherwise it ends up behind the base layer
    currentLayer.bringToFront();
    // map.on('baselayerchange', function (event) {
    //   console.log("171. baselayerchange event.name: " + event.name);
    // });
    // What is this doing? http://leafletjs.com/reference-1.2.0.html#evented 
    // Seems to be used to make sure layer desired stays on top 
    // https://gis.stackexchange.com/questions/183914/how-to-keep-vector-layer-on-top-of-all-layers-despite-toggling-order
    // map.on('overlayadd', function (event) {
    //   // console.log("174. overlayadd event.name: " + event.name);
    //   let currentOverlayLayer = event.name;  // variable used with addOpacitySlider
    //   alert("260. currentLayer: " + currentLayer);
    //   console.log("261. currentOverlayLayer: " + currentOverlayLayer);  // 1921 Baist Key Map
    //   // control.remove(); // see http://leafletjs.com/reference-1.0.3.html#control, but didn't work here as I thought it might. Trying to kill bugs
    //   addOpacitySlider(currentOverlayLayer);
    // });
  
  
    if ($('.opacity_slider_control').is(':visible')) {
      previousLayer.setOpacity(0.0);
      opacitySlider.remove(); // remove any existing opacitySlider and then add the new one in the next step
    } // end if 
    addOpacitySlider(currentLayer)
  }); // end $( "#select-overlay" ).
}); // end ready