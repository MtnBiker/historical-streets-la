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

const images = require.context('../images', true)
const imagePath = (name) => images(name, true)

// https://github.com/rails/webpacker
console.log('Hello World from Webpacker')

// Copied from crores. Not sure if need. Didn't fix the problem I was having
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import 'stylesheets/application' // https://rossta.net/blog/webpacker-with-bootstrap.html This is old style now, but when I moved application.scss to entrypoints it didn't work

// leaflet 
// import 'leaflet' // not needed if ProvidePlugin has this in environment.js. This may be redundant
import 'mapbox.js/node_modules/leaflet/src/Leaflet.js' // LEAFLET. Using because mapbox has it and presumably uses this version
//  https://github.com/PaulLeCam/react-leaflet/issues/255
import L from 'leaflet'
// import 'leaflet/dist/leaflet.css'
// import 'mapbox.js/src/mapbox.js'
import 'leaflet-draw'
import 'leaflet-bing-layer' // node-module now
// import 'leaflet.timeline'// trouble with needing Timeline.ts which wasn't there?  So use downloaded version below
import "../src/leaflet.timeline.js" 
import "../src/Leaflet.OpacityControls.js" // dont' see on npm

// import 'timeline' // Thought might be for Time

// stupid hack so that leaflet's images work after going through webpack. Copied from crores
import layers from 'leaflet/dist/images/layers.png';
import marker from 'leaflet/dist/images/marker-icon.png';
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

require("@rails/ujs").start()
// require("channels") // don't have any
require("turbolinks").start() // turning off to see if previousLayer already declared will stop. Probably did, but ignores other issues?
require("@rails/activestorage").start()
// require("trix")
// require("@rails/actiontext")
// require("jquery") // not needed by Bootstrap according to the ReadMe // Does environment.js take care of this, but do I need jQuery elsewhere. See line below
import 'jquery';
// include jQuery in global and window scope (so you can access it globally)
// in your web browser, when you type $('.div'), it is actually refering to global.$('.div')
// https://rubyyagi.com/how-to-use-bootstrap-and-jquery-in-rails-6-with-webpacker/
// Added the two following lines to get $(function() working in _map_and_control.html.erb. Don't have this in crores anymore
global.$ = global.jQuery = jQuery;
window.$ = window.jQuery = jQuery;
import 'jqueryui' // seeing if it will help with opacity slider not showing on streets/
import 'popper.js'
import "bootstrap"
// import 'bootstrap/dist/js/bootstrap' // seems redundant with above line

// I didn't do this in crores. Bu they get imported. FIXME? Adding didnt' stop the babel module error
// import '../src/Bing.js'
// import '../src/ie10-viewport-bug-workaround.js'
// import '../src/imageMapResizer.min.js'
// import '../src/leaflet-bing-layer.js' // as node-module now
// import '../src/Leaflet.OpacityControls.js'
// import '../src/leaflet.tilelayer.fallback.js'
// import '../src/leaflet.timeline.js'
import '../src/streets.js' // if streets is in packs so loads by default
// import '../src/testLeaflet.js' // dev for webpacker way. Using very simple map. Couldn't get to work if insrc. 
