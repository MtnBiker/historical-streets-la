"use strict";

function makeMap() {

// Map tile URLs
  var hamlin1908url = 'https://api.mapbox.com/styles/v1/mtnbiker/cj3gnezpq00152rt5o6g3kyqp/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXRuYmlrZXIiLCJhIjoiNmI5ZmZjMzAyNzJhY2Q0N2ZlN2E1ZTdkZjBiM2I1MTUifQ.6R3ptz9ejWpxcdZetLLRqg', 
    Hill1928aws =    'http://crores.s3.amazonaws.com/tiles/1928Hills/{z}/{x}/{y}.png',
    baistDetailAws = 'http://crores.s3.amazonaws.com/tiles/baistDetail/{z}/{x}/{y}.png', 
    baistKMaws     = "http://crores.s3.amazonaws.com/tiles/bkm/{z}/{x}/{y}.png",
    rueger1902aws  = "http://crores.s3.amazonaws.com/tiles/1902rueger/{z}/{x}/{y}.png",
    woods1908url   = "http://crores.s3.amazonaws.com/tiles/1908woods/{z}/{x}/{y}.png",
    // sanborn1894km1aURL = "//knobby.ws/crorestiles/sanborn1894km1a/{z}/{x}/{y}.png",
    sanborn1888km1aURL = "http://crores.s3.amazonaws.com/tiles/1888SanbornKM1a/{z}/{x}/{y}.png",
    sanborn1894km1aURL = "http://crores.s3.amazonaws.com/tiles/1894SanbornKM1a/{z}/{x}/{y}.png",
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
    
// Putting together. First variable is the URL of the tiles
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
      
    // baselayers are selectable in the control.layers set up at the bottom
    // The order of var = baseLayers is the order they appear on the map
    // Doing reverse chronological except two current on top (OSM & Bing) and satellites on botton
    var baseLayers = {
      // "<span style='color: green'>Bing</span>"               : bing,
      "<span style='color: orange'>OSM Street</span>"        : osmMap, // need so can switch back to
      "<span style='color: blue'>1921 Baist detail</span>"   : baistDetail,
      "<span style='color: blue'>1921 Baist Key Map</span>"  : baistKM,
      "1928 Hill"    : hill1928,
      "1908 Woods"   : woods1908,
      "1908 Hamlin"  : hamlin1908,
      "1902 Rueger"  : rueger1902,
      "1894 Sanborn" : sanborn1894km1a,
      "1888 Sanborn" : sanborn1888km1a,
      "<span style='color: green'>ESRI Satellite</span>"     : esriMap,
      "<span style='color: green'>Google Satellite</span>"   : google
    };
    
    // Sets up map, but if there is a segment defined will zoom to that in the next if statement
    // Original general case
    // var map = L.map('map').setView([34.05, -118.25], 13,);
    // Experimenting with slider, FIXED TO hill1928. Not viable in general.
    var map = new L.map('map', {
        center: new L.LatLng(34.05, -118.25), 
        zoom: 13,
        layers: [osmMap, woods1908],
        zoomControl: true
    });
    // gon is a gem which allows reading of gon. variables defined in the controller
    console.log("typeof gon.streetExtentArray: " + typeof gon.streetExtentArray);
    var streetExtentArray = gon.streetExtentArray;
    console.log("typeof streetExtentArray: " + typeof streetExtentArray);
    
    // Contortions to get the bounds if the streetExtentArray has data and coerce to the needed types
    // May not be correctly leveraging gon. I'M GETTING erb NOT gon.
    // TODO. Go back to gon, may be easier that what I've got ehre
    if ( streetExtentArray == null ) {
      console.log("streetExtentArray is null");
    } else {
      console.log(streetExtentArray.length);
      // L.polyline(streetExtentArray).addTo(map)
      //     .bindPopup("<%= @street.dateEarliest %><br><%= @street.currentName %><br><%= @street.dateLatest %>")
      //      // .openPopup("< = @street.extent_array.getCenter() %>") // need to parse to get coordinate getCenter works on latlng in Leaflet, but not on simple array
      // ;
      if (streetExtentArray == undefined) {
        console.log("streetExtentArray is undefined: " ) 
      } else {
        console.log("streetExtentArray not null and length gt 2: " + streetExtentArray );
        
        // Can't do the following in js. Maybe can create some variable and pass them in, but maybe won't need to once figure out how to find the variable needed to set the map of interest
        // map.fitBounds(<%= @street.extent_array %>); // zooms to area of interest
        //
        // L.polyline(<%= @street.extent_array %>).addTo(map)
        //     .bindPopup("&le;<%= @street.dateEarliest %><br><%= @street.currentName %><br>&ge;<%=@street.dateLatest %>")
             // .openPopup("< = @street.extent_array.getCenter() %>") // need to parse to get coordinate getCenter works on latlng in Leaflet, but not on simple array
        ;       
      }
    };

    // adds the default map layer. Does this layer remain on when selecting one the layers from control.layer? I don't think so. But you have to select one button anyway 
    // L.tileLayer(osmUrl).addTo(map); // can switch to this, but Bing is easier to read street names.
  // L.tileLayer.bing('AtGe6-aWfp_sv8DMsQeQBgTVE0AaVI2WcT42hmv12YSO-PPROsm9_UvdRyL91jav').addTo(map) // , {type: 'Road'} doesn't work, had to set in the leaflet-bing-layer.js
  //
  //   // Adds control to show other layers.
     // collapsed: false is good because reveals the option of selecting layers. Have it true because the opacity slider is buried by it.
    // L.control.layers(baseLayers, overlays).addTo(map); // null: so no overlays are being specified. Are overlays points, for example. Null needed or it doesn't work.

    L.control.layers( baseLayers, null, {collapsed:true} ).addTo(map);
    
//Create the opacity controls
    var higherOpacity = new L.Control.higherOpacity();
    map.addControl(higherOpacity);
    var lowerOpacity = new L.Control.lowerOpacity();
    map.addControl(lowerOpacity);
    var opacitySlider = new L.Control.opacitySlider();
    map.addControl(opacitySlider);

//Specify the layer for which you want to modify the opacity. Note that the setOpacityLayer() method applies to all the controls.
//You only need to call it once. 
    opacitySlider.setOpacityLayer(woods1908);
    
//Set initial opacity to 0.5 (Optional)
    woods1908.setOpacity(0.5);
}  
    