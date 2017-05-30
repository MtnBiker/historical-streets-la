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
  
// Is rail-ujs in conflict with jquery_ujs?
//= require rails-ujs
//= require jquery
//= require tether
//= require bootstrap-sprockets
//= require jquery-ui
//  require jquery_ujs
//  Bootstrap-Editable-Rails shows to have both of these
// Ah there are two js files in the gem, the original, and another rails one, only 34 lines all v1.5.1 at present. This was a trial, see 6-bootstrap-editable-rails
// require bootstrap-editable
// require bootstrap-editable-rails
//= require leaflet
//= require leaflet.draw
// provides jqgrid jquery plugin from gem 'jqgrid-jquery-rails':
//  require jqgrid-jquery-rails
  
//= require turbolinks
//= require_tree .
