function overviewMap() {

  showMap(); // showMap draws the map and adds control to select basemaps.

// overview_data matches def in streets_controller.rb and the route. Clark 157ff
  // probably don't need to have the `var extentLayer  = ` since not reusing extentLayer, although Clark p162 used it to set the bounds TODO
  var extentLayer  = L.mapbox.featureLayer().loadURL('streets/overview_data.geojson').addTo(map);
  // var featureLayer  = L.mapbox.featureLayer().addTo(map);
  // featureLayer.loadURL('streets/overview.geojson');

} // end overviewMap
