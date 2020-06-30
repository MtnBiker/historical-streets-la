// app/javascripts/packs/application.js
// webpack calls this file an "entry point" and Webpacker calls it a "pack". per rossta
/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
// Uncommenting the following two lines Didn't help find missing layers.png. 2020.06.25
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

// https://github.com/rails/webpacker
console.log('Hello World from Webpacker')

// Copied from crores. Not sure if need. Didn't fix the problem I was having
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import 'stylesheets/application' // https://rossta.net/blog/webpacker-with-bootstrap.html

// leaflet 
// import 'leaflet' // not needed if ProvidePlugin has this in environment.js. This may be redundant
import 'mapbox.js/node_modules/leaflet/src/Leaflet.js' // LEAFLET
import "../src/leaflet.timeline.js"
//  https://github.com/PaulLeCam/react-leaflet/issues/255
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'mapbox.js/src/mapbox.js'

// stupid hack so that leaflet's images work after going through webpack. Copied from crores
import layers from 'leaflet/dist/images/layers.png';
import marker from 'leaflet/dist/images/marker-icon.png';
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

require("@rails/ujs").start()
// require("channels") // don't have any
// require("turbolinks").start() // turning off to see if previousLayer already declared will stop
require("@rails/activestorage").start()
// require("trix")
// require("@rails/actiontext")
// require("jquery") // not needed by Bootstrap according to the ReadMe // Does environment.js take care of this, but do I need jQuery elsewhere. See line below
import 'jquery'
import 'popper.js'
import "bootstrap"
// import 'bootstrap/dist/js/bootstrap' // seems redundant with above line

// I didn't do this in crores. Bu they get imported. FIXME? Adding didnt' stop the babel module error
// import '../src/Bing.js'
// import '../src/ie10-viewport-bug-workaround.js'
// import '../src/imageMapResizer.min.js'
import '../src/leaflet-bing-layer.js'
// import '../src/Leaflet.OpacityControls.js'
// import '../src/leaflet.tilelayer.fallback.js'
// import '../src/leaflet.timeline.js'
import '../src/streets.js' // if streets is in packs so loads by default
// import '../src/testLeaflet.js' // dev for webpacker way. Using very simple map. Couldn't get to work if insrc. 
