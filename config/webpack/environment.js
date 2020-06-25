// config/webpack/environment.js
const { environment } = require('@rails/webpacker') // by default

// All but last line from crores5
const webpack = require('webpack')
// const erb = require('./loaders/erb') // had this, but is it needed?

// GoRails and but I had to put most of this in application.js to define $ and jQuery.  
// Needed here to not get web page loading errors; similar statements  in application.js don't work
// The following adds jQuery **globally** for crores http://blog.blackninjadojo.com/ruby/rails/2019/03/01/webpack-webpacker-and-modules-oh-my-how-to-add-javascript-to-ruby-on-rails.html

// Add an additional plugin of your choosing : ProvidePlugin
// The process for adding or modifying webpack plugins
// https://github.com/rails/webpacker/blob/master/docs/webpack.md#plugins

environment.plugins.append('Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery/src/jquery', // Is the "jquery/src/" prefix needed ? Not the first time I've seen this
    jquery: 'jquery/src/jquery'
    // 'window.Jquery': 'jquery', 
    // https://www.lugolabs.com/articles/using-webpacker-in-ruby-on-rails-applications
    // Popper: ['popper.js' ,'default']
    // L: 'leaflet' // this is somewhat equivalent to import 'leaflet' but generated conflicts with leaflet.timeline. I may have addressed this in application.js
    // ol: 'ol' // No OL in Historic Streets
  }))
  
  // https://stackoverflow.com/questions/57555708/rails-6-how-to-add-jquery-ui-through-webpacker
  // const aliasConfig = {
  //     'jquery': 'jquery-ui-dist/external/jquery/jquery.js',
  //     'jquery-ui': 'jquery-ui-dist/jquery-ui.js'
  // };
  // environment.config.set('resolve.alias', aliasConfig);


// environment.loaders.prepend('erb', erb) // goes with line 6 no doubt
  

module.exports = environment // by default
