/**
 * Created: vogdb Date: 5/4/13 Time: 1:54 PM
 * Version: 0.3.0
 * GVS removed legacy code since won't be using 0.7
 */

L.Control.ActiveLayers = L.Control.Layers.extend({
  // console.log("control.activeLayers:7. L.Control.Layers.extend")
  /**
   * Get currently active base layer on the map
   * @return {Object} l where l.name - layer name on the control,
   *  l.layer is L.TileLayer, l.overlay is overlay layer.
   */
  getActiveBaseLayer: function () {
    return this._activeBaseLayer
  },

  /**
   * Get currently active overlay layers on the map
   * @return {{layerId: l}} where layerId is <code>L.stamp(l.layer)</code>
   *  and l @see #getActiveBaseLayer jsdoc.
   */
  getActiveOverlayLayers: function () {
    console.log("24:ActiveLayers. this._activeOverlayLayers: %o", this._activeOverlayLayers)
    return this._activeOverlayLayers
  },

  onAdd: function (map) {
    var container = L.Control.Layers.prototype.onAdd.call(this, map)

    this._activeBaseLayer = this._findActiveBaseLayer()
    this._activeOverlayLayers = this._findActiveOverlayLayers()
    console.log("32:ActiveLayers. this._activeOverlayLayers: %o", this._activeOverlayLayers) // Needs to find the active layer
    
    console.log("40:ActiveLayers. container: %o", container)
    return container
  },

  _findActiveBaseLayer: function () {
    console.log("ActiveLayers:45. this._layers (via percent 0) %o", this._layers)
    var layers = this._layers
    console.log("ActiveLayers:47. layers (via percent 0) %o", layers)
    for (var i = 0; i < layers.length; i++) {
      var layer = layers[i]
      console.log(i + ". ActiveLayers:50. layer: %o; layer.overlay: %o", layer, layer.overlay) // the list, but not about activeLayer.
      console.log("ActiveLayers:46. this._map.hasLayer(layer.layer): %o", this._map.hasLayer(layer.layer)) // Has to be true for ActiveLayers to proceed, i.e. throws error below if not
      if (!layer.overlay && this._map.hasLayer(layer.layer)) {
        // console.log("ActiveLayers:53. layer = " + layer) // Object
        console.log("ActiveLayers:54. layer (via percent 0): %o; layer.name %o", layer, layer.name) // NewClass and name of layer
        return layer
      }else{  // GVS add to account for no initial layer. Minor side effect is that button isn't lite for Bing on intial load
        layer = null
        return layer
      }
    }
    throw new Error('Control doesn\'t have any active base layer!')
  },

  _findActiveOverlayLayers: function () {
    var result = {}
    var layers = this._layers
    for (var i = 0; i < layers.length; i++) {
      var layer = layers[i]
      if (layer.overlay && this._map.hasLayer(layer.layer)) {
        result[layer.layer._leaflet_id] = layer
      }else{  // GVS add to account for no initial layer
        layer = null
        return layer
        
      }
    }
    console.log("ActiveLayers:65. layer.name = " + layer.name) // Gets to here on ititial page load. Reports last layer on list (not the active layer)
    console.log("ActiveLayers:66. result: %o ", result)
    return result
  },

  _onLayerChange: function () {
    // console.trace()
    console.log("79:ActiveLayers. this: " + this + ". arguments[0]: " + arguments[0])
    console.log("80:ActiveLayers. this %o; arguments %o; arguments[0] %o: " , this, arguments, arguments[0]) // NewClass, remove
    L.Control.Layers.prototype._onLayerChange.apply(this, arguments) 
    this._recountLayers()
  },

  _onInputClick: function () {
    this._handlingClick = true
    
    // Unselect all layers except the clicked one
    console.log("89:ActiveLayer. this: %o: ", this)
    
    this._recountLayers()
    L.Control.Layers.prototype._onInputClick.call(this)

    this._handlingClick = false
  },

  _recountLayers: function () {
    var i, input, obj,
      inputs = this._form.getElementsByTagName('input'),
      inputsLen = inputs.length;
    
    for (i = 0; i < inputsLen; i++) {
      input = inputs[i]
      console.log(i + " ActiveLayers:106. inputs["+i+"]: %o", inputs[i])
      console.log("Array.isArray(this._layers)", Array.isArray(this._layers)) // true
      console.log("this._layers[i]: ",this._layers[i])
      if (Array.isArray(this._layers)) {
        obj = this._layers[i]
        console.log(i + ". ActiveLayers:111. obj: %o", obj)
      }

      if (input.checked && !this._map.hasLayer(obj.layer)) {
        console.log(i + ". ActiveLayers:115. input.layerId: %o", input.layerId)
        console.log(i + ". ActiveLayers:116. obj: %o", obj)
        // Since this caused an error and seemed to fit what I'm trying to do, I knocked it out.
        // Still spawns extra opacity bars
        // if (obj.overlay) {
        //   this._activeOverlayLayers[input.layerId] = obj
        // } else {
          this._activeBaseLayer = obj
        // }
      } else if (!input.checked && this._map.hasLayer(obj.layer)) {
        if (obj.overlay) {
          console.log("121. this._map.hasLayer %o. obj.overlay: %o. this._map.hasLayer %o", Array.isArray(this._layers), obj.overlay, Array.isArray(this._layers)) // of course true or wouldn't get here
          console.log("122. input.layerId: %o.", input.layerId)  // e.g. 65
          delete this._activeOverlayLayers[input.layerId]
        }
      }
    }
  }

})

L.control.activeLayers = function (baseLayers, overlays, options) {
  console.log("135. in the function L.control.activeLayers")
  return new L.Control.ActiveLayers(baseLayers, overlays, options)
}
