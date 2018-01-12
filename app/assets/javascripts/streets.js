"use strict";

// .erb to process Ruby MAPBOX_TOKEN with ENV. Removed .erb 2017.10.11 since not using MapBox
// Called from show.html.erb and edit.html.erb and maybe new.html.erb
// First set up common variables, then function specific to each show and edit
// Used to be _map.initial.js.erb and _leafletmap.show.html.erb which may be able to delete TODO
// Declare global variables used by both functions

// named laMap instead of map to be very clear about what I was doing when trying to debug JavaScript problems
var laMap; // can't do it in showMap, because overlayMap selector needs it and no way to pass it in, but I'm moving the call to show map
// console.log('8. streets.js. laMap declared, but not given a value: laMap:', laMap);
// var bing;
var imagerySet = "Road"; // AerialWithLabels | Birdseye | BirdseyeWithLabels | Road -- select one forBing map. Using this with L.BingLayer. Could use with L.tileLayer.bing too
let previousLayer;
let opacitySlider; // global so works for remove
// let mapID;
let maxZoom;
let maxMapZoom;
let currentLayer;
let currentZoom;
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
    esriLink = '<a href="https://www.esri.com/">ESRI</a>',
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
// console.log(('81. end of variable declaration. laMap:', laMap);
// ############################################################################################
// One function for edit and one for show. editMap is added to the bottom of showMap
// For street > show. Used for show and called by editMap and overviewMap to get all the initial stuff
// Used also by overviewMap

// used by showMap, but pulls out complicated logic into a function. And seem to work better
function showSegment(laMap) {
  var streetExtentArray = gon.streetExtentArray; // works better with this even if repeated later. And this has to be in the function, not with the other var. gon not defined if outside. In the statement, the streetExtentArray only exists in the sense of gon.
  var streetExtentJson = gon.streetExtentJson; // is this needed? Yes, otherwise streetExtentJson is undefined below and it's used several times, so worth declaring. True even if just declare `var streetExtensionJson;`

// Don't want to do the following for overviewMap. A bit of a work around since calling this for overview
  if (streetExtentArray != undefined || streetExtentJson != undefined) {
    // If linestring exists, draw it. this is for edit and show, but not overview
    // But also have to pick between streetExtentArray and streetExtentJson (should be able to eliminate streetExtentArray when data all in streetExtentJson. I had both because had trouble getting one or the other working.)
    if (streetExtentJson != null && streetExtentJson.length > 2) {
      var streetExtentJson = JSON.parse(streetExtentJson); // without this "Invalid GeoJSON object." Even though look the same.
      var geojsonLayer = L.geoJSON(streetExtentJson).addTo(laMap).bindPopup(popupText).openPopup();
      laMap.fitBounds(geojsonLayer.getBounds()); // this is in place of fitBounds which doesn't work with GeoJSON because of the lat lng transposition
    } else { 
      if (streetExtentArray != undefined && streetExtentArray.length > 2)
        { // can get rid of this when done with streetExtentArray
          var arrayStreetExtent = JSON.parse(gon.streetExtentArray);
          laMap.fitBounds(arrayStreetExtent); // zooms to area of interest
          L.polyline(arrayStreetExtent).addTo(laMap).bindPopup(popupText).openPopup();
        } // end if within the else (streetExtentArray…/json)
    } // end else
  }; // end if 15 lines above
} // end of showSegment

function showMap(popupText) {  
  // console.trace();
  // if (typeof map === 'undefined' || !map){
  //   console.log('89. top of showMap. map is undefined. laMap:', laMap, 'popupText:', popupText);
  // } else {
  //   console.log('91. top of showMap. map:', map, 'laMap:', laMap, 'popupText:', popupText);
  // }
  //
  //
  // // Sets up map, but if there is a linestring defined will zoom to that in the next if statement
  // // But need a baselayer and a overlayLayer for opacitySlider to load
  // // Now trying to add the overlayLayer without L.control.activeLayers
  // if (typeof laMap !== "undefined" && laMap !== null && laMap != undefined) {
  // // if (laMap != undefined) {
  //   laMap="";
  // } else {
  //   console.log("103. laMap is null")
  // }
  // It shouldn't be necessary as laMap is reassigned in the next line, why does it matter if it's already defined.
  // All the above may not be needed. Still get one error on index, but so what?
  // if (map != undefined) { map.remove(); }
  // var laMap;
  laMap = L.map('map', {zoomDelta: 0.25,
                      zoomSnap: 0.25
  }).setView([34.05, -118.25], 13);
  // console.log(('101. showMap. laMap just defined. laMap:', laMap, 'map:', map); 
  // osmMap.addTo(laMap); // trial to se how worked with overlayLayers. I prefer Bing since it's cleaner
  bing.addTo(laMap); // Makes Bing load with intial page load. Doesn't matter after that. Maybe L.control.layers doesn't load anything. May not show without reload. Previously had the whole definition of bing here; particularly if no map to show, i.e., segment not defined. NO: may want to look around map before editing. Commented out to see if helped with change of baselayer covering overlay-made not difference.
  L.control.layers(baseLayers).addTo(laMap); // baseLayers defined about ten lines above

// Above established the basemap as Bing or OSM. Now add street segment(s)
// if (streetExtentArray != undefined || streetExtentJson != undefined) { // didn't work if outside the function
  showSegment(laMap); // laMap is global, so probably don't need to do this
// }
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
          laMap.on('zoomstart zoom zoomend', function(ev)
          {
          	gauge.innerHTML = 'Zoom level: ' + laMap.getZoom();
          })
          container.appendChild(gauge);

          return container;
        }
  	}); // end ZoomViewer
  	(new ZoomViewer).addTo(laMap); // unknown to me syntax  TODO, not currently showing up

// Put the layer selection control on the map. Note that we need two `layers` from the map definition
  // The event handler for changing the display after the selection of an overlayLayer?? Is this comment orphaned?
// console.log(('152. end of showMap. map:', map, 'laMap:', laMap); 
overlaySelector(laMap); // page is built with _overlaymap_selector.html.erb, but this all puts in the listener. 
};  // end showMap

// #############################################################################################
// editMap. Streets > Edit. Note uses showMap, essentially editMap is added to the bottom of showMap
function editMap(popupText) {
  if (laMap != undefined) { laMap.remove(); } // no reason laMap should exist at this point??
  showMap(popupText); // showMap draws the map and adds control to select basemaps.
  // console.log('159. top of editMap, just after calling showMap. map:', map, 'laMap:', laMap);
  // Now we add what's needed to draw the extent and save to database
// https://github.com/michaelguild13/Leaflet.draw
// https://github.com/Leaflet/Leaflet.draw/wiki/API-Reference#ldrawhandlers
  // Initialise the FeatureGroup to store editable layers
  var drawnItems = new L.FeatureGroup();
  laMap.addLayer(drawnItems);

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
  laMap.addControl(drawControl);
  // finished adding drawing controls

  laMap.on('draw:created', function(e) {
    // featureGroup.addLayer(e.layer); // might be equivalent to the following two lines
    var type = e.layerType,
      layer = e.layer;

  var geojson = layer.toGeoJSON();  // is an object Object, therefore stringify below.

  // Write GeoJSON to steet.extent_json for saving from the form.
  $("#street_extent_json").val(JSON.stringify(geojson.geometry));
  // This GeoJSON seems contorted. why not using featureGroup (not the same as GeoJSON feature) or drawnItems instead of layer. Why go val(JSON.stringify(layer.toGeoJSON))? Maybe stringify is needed. I think I'm getting the right result though

// Add the drawn line to a layer to display it in the map.
    drawnItems.addLayer(layer);
  }); // end laMap.on

  $('map').imageMapResize();
  // console.log('203. end of editMap. map:', map, 'laMap:', laMap); 
};  // end editMap

// ######################
// All the segments shown on one map. Called from overview.index.html
function overviewMap() {
  showMap(); // showMap draws the map and adds control to select basemaps.

// The popup shows with just this , no bindPopup or openPopup
  
  var segmentLayer = L.mapbox.featureLayer().loadURL('overview/overview_data.geojson').addTo(laMap);
  
  // Getting out of mapbox into Leaflet so can work with color, etc.
  // var data = loadURL('overview/overview_data.geojson');
  // L.geoJSON(data, {
  //     style: function (feature) {
  //         return {color: 'red'};
  //     }
  // }).bindPopup(function (layer) {
  //     return layer.feature.properties.description;
  // }).addTo(laMap);
    
  // May need to openPopup. Read the following and ??
  // https://gis.stackexchange.com/questions/111410/display-a-link-in-a-popup-with-leaflet
  // https://gis.stackexchange.com/questions/229723/how-to-display-properties-of-geojson-in-popup-on-leaflet
  
  // L.mapbox.featureLayer().loadURL('overview/overview_data.geojson').addTo(map).bindPopup(feature.properties.title).openPopup();
 // console.log('230. end of overviewMap. map:', map, 'laMap:', laMap); 
}; // end overviewMap

//  #############################
// pulled out this function to help debug overlaySelector
function findSelectedMap(mapID, cb) {
  // console.log('236. top of findSelectedMap. map:', map, 'laMap:', laMap);
   $.getJSON('/maps.json', function(json) { // not sure what this json is, but without it, the each never happens. The leading slash says that map.json is at the top level
     // console.log('238. in findSelectedMap and getJSON.map.json. map', map, 'laMap:', laMap); 
     let i = 1; // only for console.log
    json.forEach(function(entry) {
      // Should stop the if once a match is found, but the loop is set by the each and not sure how to stop 
      if (entry.maps.id == mapID) {
        changeLayerTo = entry.maps.url;
        maxZoom = entry.maps.zoom;
        maxMapZoom = entry.maps.zoom;
        // return false; // acts like a break inside a $().each, but not a forEach loop
      } // end if
      i =+ 1;
    }); // end json.forEach
    cb(); // the function passed in now goes. Which is putting the overlayMap and associated pieces on the page https://stackoverflow.com/questions/48039169/execution-order-of-javascript#48039220
  }); // end $.getJSON
  // console.log('251. end of findSelectedMap. map:', map, 'laMap:', laMap);
}; // end findSelectedMap

// called by _overlaymap_selector.html.erb which is on streets > overview, show and edit. So ready to respond
function overlaySelector(laMap) {
  // console.log('257. Top of overlaySelector. laMap: ', laMap);
  // Adding overlays. This doesn't happen until one of the overlays is selected.  
  $( "#select-overlay" ).change(function() {
     // console.log('260. top of $( "#select-overlay" ) within overlaySelector map:', map, 'laMap:', laMap);

    // Get layer selected. Identify by map.id as set in _overlay_selector.html.erb    
    let mapID = $("#select-overlay input[type='radio']:checked").val();
    // The function that is passed in is executed after the json.forEach is executed.
    findSelectedMap(mapID, function() {
      // console.log('266. top of overlaySelector in findSelectedMap call. laMap:', laMap);
        currentLayer = L.tileLayer(changeLayerTo).addTo(laMap);
        currentZoom = laMap.getZoom();
        // Maps have various zoom levels and as overlay maps are selected reset the maxZoom
        // may want to just set the zoom so can be seen and let people overzoom
        // console.log(`271. currentZoom: ${currentZoom} and maxZoom: ${maxZoom}. laMap: ${laMap}`)
        if (currentZoom > maxMapZoom) {
          // laMap.setMaxZoom(maxMapZoom+1); // not sure about doing this. In theory stops zooming past what can be shown
          laMap.setZoom(maxMapZoom);
        }    
        let addOpacitySlider = function(currentLayer) {
          // Create the opacity controls—the slider
          // Better if I can place opacitySlider to the right of the layer control, moot with Rails approach to overlayLayers
          opacitySlider = new L.Control.opacitySlider();
          laMap.addControl(opacitySlider);
          // Specify the layer for which you want to modify the opacity. 
          // Note that the setOpacityLayer() method applies to all the controls.
          // You only need to call it once.
          opacitySlider.setOpacityLayer(currentLayer);
          //Set initial opacity to 0.5 (Optional, but helps with understanding what one is seeing)
          currentLayer.setOpacity(0.6);
          previousLayer = currentLayer; // so can remove below. May be able to reorder the  $( "#select-overlay" ).change(function() to avoid having this extra variable. But first get it all working
        } // end addOpacitySlider
    
        // This is bringing the overlay map on top, otherwise it ends up behind the base layer
        currentLayer.bringToFront();

        if ($('.opacity_slider_control').is(':visible')) {
          previousLayer.setOpacity(0.0);
          opacitySlider.remove(); // remove any existing opacitySlider and then add the new one in the next step
        } // end if 
        addOpacitySlider(currentLayer);
        // console.log('298. end of overlaySelector in findSelectedMap. map:', map, 'currentLayer:', currentLayer, 'laMap:', laMap);
    }); // using mapID, find the url, zoom for overlayMap selected 
    // console.log('300. end $( "#select-overlay" ) within overlaySelector map:', map, 'laMap:', laMap);   
  }); // end $( "#select-overlay" ).
  // console.log('302. end of overlaySelector. map:', map, 'laMap:', laMap);  
}; // end overlaySelector function
