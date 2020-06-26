// this code works when pasted enclosed in script tags on _map_and_control.html.erb
// this being used to figure out how Webpacker works
// Works if in packs, but not in src

document.addEventListener('DOMContentLoaded', function () {
  console.log(
    'testLeaflet.js:6. document.addEventListener(DOMContentLoaded worked). document.readyState was false ?',
  );
  makeLeafletMap();
});
function makeLeafletMap() {
  var mymap = L.map('map').setView([51.505, -0.09], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoibXRuYmlrZXIiLCJhIjoiNmI5ZmZjMzAyNzJhY2Q0N2ZlN2E1ZTdkZjBiM2I1MTUifQ.6R3ptz9ejWpxcdZetLLRqg'
  }).addTo(mymap);
}
