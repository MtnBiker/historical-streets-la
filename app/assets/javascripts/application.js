// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.

// Bootstrap tooltips and popovers depend on popper.js for positioning, so is needed
// turbolinks should come after jquery. With tree they load in alphabetical order, so this is OK either way

// Is rail-ujs in conflict with jquery_ujs? Doesn't seem to be
//= require rails-ujs
// https://github.com/twbs/bootstrap-rubygem bootstrap possible instead of bootstrap-sprockets. 
// Use jquery3 instead of jquery?. v3 is current. I think jQuery3 means no v1 which supports older browsers. Bootstrap gem says use jquery3
//= require jquery3
//= require turbolinks
//= require popper
//= require tether
//= require bootstrap-sprockets
//= require jquery-ui
//  require jquery_ujs
// Leaflet is included in mapbox, so don't need to load it.
//  require leaflet
//= require leaflet.draw

//= require_tree .
