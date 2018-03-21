// https://github.com/skeate/Leaflet.timeline
/* global L */

// GVS put Timeline.js, TimelineSliderControl.js and IntervalTree together to get a full version sans minification

// Imported IntervalTree in manually to make it work. Made one mod to that code
/**
 * A node in the interval tree.
 *
 * @property {number} low Start of the interval
 * @property {number} high End of the interval
 * @property {number} min The lowest endpoint of this node's interval or any of
 * its children.
 * @property {number} max The greatest endpoint of this node's interval or any
 * of its children.
 * @property {*} data The value of the interval
 * @property {IntervalTreeNode?} left Left child (lower intervals)
 * @property {IntervalTreeNode?} right Right child (higher intervals)
 * @property {IntervalTreeNode?} parent The parent of this node
 * @private
*/
class IntervalTreeNode {
  constructor(low, high, data, parent) {
    this.low = low;
    this.high = high;
    this.min = low;
    this.max = high;
    this.data = data;
    this.left = null;
    this.right = null;
    this.parent = parent;
  }
}

/**
 * An interval tree is a data structure that holds intervals. For example, if
 * you had events which took place over a period of time, you might store them
 * in an interval tree where the interval is their duration.
 *
 * It allows you to find all intervals which contain a specific point, or
 * overlap with a given interval.
*/
class IntervalTree {
  /**
   * Constructs an empty interval tree.
   */
  constructor() {
    this._root = null;
    /** @type {number} */
    this.size = 0;
  }

  /**
   * Actually insert a new interval into the tree. This has a few extra
   * arguments that don't really need to be exposed in the public API, hence the
   * separation.
   *
   * @private
   * @param {number} begin Start of the interval
   * @param {number} end End of the interval
   * @param {*} value The value of the interval
   * @param {IntervalTreeNode?} node The current place we are looking at to add
   * the interval
   * @param {IntervalTreeNode?} parent The parent of the place we are looking to
   * add the interval
   * @param {string} parentSide The side of the parent we're looking at
   * @returns {IntervalTreeNode} The newly added node
  */
  _insert(begin, end, value, node, parent, parentSide) {
    let newNode;
    if (node === null) {
      // The place we're looking at is available; let's put our node here.
      newNode = new IntervalTreeNode(begin, end, value, parent);
      if (parent === null) {
        // No parent? Must be root.
        this._root = newNode;
      } else {
        // Let the parent know about its new child
        parent[parentSide] = newNode;
      }
    } else {
      // No vacancies. Figure out which side we should be putting our interval,
      // and then recurse.
      const side = (begin < node.low || begin === node.low && end < node.high)
        ? 'left'
        : 'right';
      newNode = this._insert(begin, end, value, node[side], node, side);
      node.max = Math.max(node.max, newNode.max);
      node.min = Math.min(node.min, newNode.min);
    }
    return newNode;
  }

  /**
   * Insert a new value into the tree, for the given interval.
   *
   * @param {number} begin The start of the valid interval
   * @param {number} end The end of the valid interval
   * @param {*} value The value for the interval
  */
  insert(begin, end, value) {
    this._insert(begin, end, value, this._root, this._root);
    this.size++;
  }

  _lookup(point, node = this._root) {
    const overlaps = [];
    if (node === null || node.max < point) {
      return overlaps;
    }
    overlaps.push(...this._lookup(point, node.left));
    if (node.low <= point) {
      if (node.high >= point) {
        overlaps.push(node.data);
      }
      overlaps.push(...this._lookup(point, node.right));
    }
    return overlaps;
  }

  /**
   * Find all intervals that cover a certain point.
   *
   * @param {number} point The sought point
   * @returns {*[]} An array of all values that are valid at the given point.
  */
  lookup(point) {
    return this._lookup(point);
  }

  _overlap(begin, end, node = this._root) {
    const overlaps = [];
    if (!(begin > node.high || node.low > end)) {
      overlaps.push(node.data);
    }
    if (node.left && node.left.max >= begin) {
      overlaps.push(...this._overlap(begin, end, node.left));
    }
    if (node.right && node.right.min <= end) {
      overlaps.push(...this._overlap(begin, end, node.right));
    }
    return overlaps;
  }

  /**
   * Find all intervals that overlap a certain interval.
   *
   * @param {number} begin The start of the valid interval
   * @param {number} end The end of the valid interval
   * @returns {*[]} An array of all values that overlap the given interval.
  */
  overlap(begin, end) {
    return this._overlap(begin, end);
  }
}

// Original Timeline.js starts
L.Timeline = L.GeoJSON.extend({
  times:  null,
  ranges: null,

  /**
   * @constructor
   * @param {Object} geojson The GeoJSON data for this layer
   * @param {Object} options Hash of options
   * @param {Function} [options.getInterval] A function which returns an object
   * with `start` and `end` properties, called for each feature in the GeoJSON
   * data.
   * @param {Boolean} [options.drawOnSetTime=true] Make the layer draw as soon
   * as `setTime` is called. If this is set to false, you will need to call
   * `updateDisplayedLayers()` manually.
  */
  initialize(geojson, options = {}) {
    this.times = [];
    this.ranges = new IntervalTree();
    const defaultOptions = {
      drawOnSetTime: true,
    };
    L.GeoJSON.prototype.initialize.call(this, null, options);
    L.Util.setOptions(this, defaultOptions);
    L.Util.setOptions(this, options);
    if (this.options.getInterval) {
      this._getInterval = (...args) => this.options.getInterval(...args);
    }
    if (geojson) {
      this._process(geojson);
    }
  },

  _getInterval(feature) {
    const hasStart = 'start' in feature.properties;
    const hasEnd = 'end' in feature.properties;
    if (hasStart && hasEnd) {
      return {
        start: new Date(feature.properties.start).getTime(),
        end:   new Date(feature.properties.end).getTime(),
      };
    }
    return false;
  },

  /**
   * Finds the first and last times in the dataset, adds all times into an
   * array, and puts everything into an IntervalTree for quick lookup.
   *
   * @param {Object} data GeoJSON to process
  */
  _process(data) {
    // In case we don't have a manually set start or end time, we need to find
    // the extremes in the data. We can do that while we're inserting everything
    // into the interval tree.
    let start = Infinity;
    let end = -Infinity;
    data.features.forEach((feature) => {
      const interval = this._getInterval(feature);
      if (!interval) { return; }
      this.ranges.insert(interval.start, interval.end, feature);
      this.times.push(interval.start);
      this.times.push(interval.end);
      start = Math.min(start, interval.start);
      end = Math.max(end, interval.end);
    });
    this.start = this.options.start || start;
    this.end = this.options.end || end;
    this.time = this.start;
    if (this.times.length === 0) {
      return;
    }
    // default sort is lexicographic, even for number types. so need to
    // specify sorting function.
    this.times.sort((a, b) => a - b);
    // de-duplicate the times
    this.times = this.times.reduce((newList, x, i) => {
      if (i === 0) {
        return newList;
      }
      const lastTime = newList[newList.length - 1];
      if (lastTime !== x) {
        newList.push(x);
      }
      return newList;
    }, [this.times[0]]);
  },

  /**
   * Sets the time for this layer.
   *
   * @param {Number|String} time The time to set. Usually a number, but if your
   * data is really time-based then you can pass a string (e.g. '2015-01-01')
   * and it will be processed into a number automatically.
  */
  setTime(time) {
    this.time = typeof time === 'number' ? time : new Date(time).getTime();
    if (this.options.drawOnSetTime) {
      this.updateDisplayedLayers();
    }
    this.fire('change');
  },

  /**
   * Update the layer to show only the features that are relevant at the current
   * time. Usually shouldn't need to be called manually, unless you set
   * `drawOnSetTime` to `false`.
  */
  updateDisplayedLayers() {
    // This loop is intended to help optimize things a bit. First, we find all
    // the features that should be displayed at the current time.
    const features = this.ranges.lookup(this.time);
    // Then we try to match each currently displayed layer up to a feature. If
    // we find a match, then we remove it from the feature list. If we don't
    // find a match, then the displayed layer is no longer valid at this time.
    // We should remove it.
    for (let i = 0; i < this.getLayers().length; i++) {
      let found = false;
      const layer = this.getLayers()[i];
      for (let j = 0; j < features.length; j++) {
        if (layer.feature === features[j]) {
          found = true;
          features.splice(j, 1);
          break;
        }
      }
      if (!found) {
        const toRemove = this.getLayers()[i--];
        this.removeLayer(toRemove);
      }
    }
    // Finally, with any features left, they must be new data! We can add them.
    features.forEach(feature => this.addData(feature));
  },
});

L.timeline = (geojson, options) => new L.Timeline(geojson, options);

/*
 * @class
 * @extends L.Control
*/
L.TimelineSliderControl = L.Control.extend({
  /**
   * @constructor
   * @param {Number} [options.duration=10000] The amount of time a complete
   * playback should take. Not guaranteed; if there's a lot of data or
   * complicated rendering, it will likely wind up taking longer.
   * @param {Boolean} [options.enableKeyboardControls=false] Allow playback to
   * be controlled using the spacebar (play/pause) and right/left arrow keys
   * (next/previous).
   * @param {Boolean} [options.enablePlayback=true] Show playback controls (i.e.
   * prev/play/pause/next).
   * @param {Function} [options.formatOutput] A function which takes the current
   * time value (usually a Unix timestamp) and outputs a string that is
   * displayed beneath the control buttons.
   * @param {Boolean} [options.showTicks=true] Show ticks on the timeline (if
   * the browser supports it).
   * @param {Boolean} [options.waitToUpdateMap=false] Wait until the user is
   * finished changing the date to update the map. By default, both the map and
   * the date update for every change. With complex data, this can slow things
   * down, so set this to true to only update the displayed date.
   * @param {Number} [options.start] The start time of the timeline. If unset,
   * this will be calculated automatically based on the timelines registered to
   * this control.
   * @param {Number} [options.end] The end time of the timeline. If unset, this
   * will be calculated automatically based on the timelines registered to this
   * control.
  */
  initialize(options = {}) {
    const defaultOptions = {
      duration:               10000,
      enableKeyboardControls: false,
      enablePlayback:         true,
      formatOutput:           output => `${output || ''}`,
      showTicks:              true,
      waitToUpdateMap:        false,
      position:               'bottomleft',
      steps:                  1000,
    };
    this.timelines = [];
    L.Util.setOptions(this, defaultOptions);
    L.Util.setOptions(this, options);
    if (typeof options.start !== 'undefined') {
      this.start = options.start;
    }
    if (typeof options.end !== 'undefined') {
      this.end = options.end;
    }
  },

  /* INTERNAL API *************************************************************/

  /**
   * @private
   * @returns {Number[]} A flat, sorted list of all the times of all layers
  */
  _getTimes() {
    const times = [];
    this.timelines.forEach((timeline) => {
      const timesInRange = timeline.times
        .filter(time => time >= this.start && time <= this.end);
      times.push(...timesInRange);
    });
    if (times.length) {
      times.sort((a, b) => a - b);
      const dedupedTimes = [times[0]];
      times.reduce((a, b) => {
        if (a !== b) {
          dedupedTimes.push(b);
        }
        return b;
      });
      return dedupedTimes;
    }
    return times;
  },

  /**
   * Adjusts start/end/step size/etc. Should be called if any of those might
   * change (e.g. when adding a new layer).
   *
   * @private
  */
  _recalculate() {
    const manualStart = typeof this.options.start !== 'undefined';
    const manualEnd = typeof this.options.end !== 'undefined';
    const duration = this.options.duration;
    let min = Infinity;
    let max = -Infinity;
    this.timelines.forEach((timeline) => {
      if (timeline.start < min) {
        min = timeline.start;
      }
      if (timeline.end > max) {
        max = timeline.end;
      }
    });
    if (!manualStart) {
      this.start = min;
      this._timeSlider.min = min === Infinity ? 0 : min;
      this._timeSlider.value = this._timeSlider.min;
    }
    if (!manualEnd) {
      this.end = max;
      this._timeSlider.max = max === -Infinity ? 0 : max;
    }
    this._stepSize = Math.max(1, (this.end - this.start) / this.options.steps);
    this._stepDuration = Math.max(1, duration / this.options.steps);
  },

  /**
   * If `mode` is 0, finds the event nearest to `findTime`.
   *
   * If `mode` is 1, finds the event immediately after `findTime`.
   *
   * If `mode` is -1, finds the event immediately before `findTime`.
   *
   * @private
   * @param {Number} findTime The time to find events around
   * @param {Number} mode The operating mode. See main function description.
   * @returns {Number} The time of the nearest event.
  */
  _nearestEventTime(findTime, mode = 0) {
    const times = this._getTimes();
    let retNext = false;
    let lastTime = times[0];
    for (let i = 1; i < times.length; i++) {
      const time = times[i];
      if (retNext) {
        return time;
      }
      if (time >= findTime) {
        if (mode === -1) {
          return lastTime;
        }
        // else if (mode === 1) {
        if (time === findTime) {
          retNext = true;
        } else {
          return time;
        }
        // }
        // this isn't actually used anywhere, and it's a private method
        // so .. commenting out
        // else {
        //   const prevDiff = Math.abs(findTime - lastTime);
        //   const nextDiff = Math.abs(findTime - time);
        //   return prevDiff < nextDiff ? lastTime : time;
        // }
      }
      lastTime = time;
    }
    return lastTime;
  },

  /* DOM CREATION & INTERACTION ***********************************************/

  /**
   * Create all of the DOM for the control.
   *
   * @private
  */
  _createDOM() {
    const classes = [
      'leaflet-control-layers',
      'leaflet-control-layers-expanded',
      'leaflet-timeline-control',
    ];
    const container = L.DomUtil.create('div', classes.join(' '));
    this.container = container;
    if (this.options.enablePlayback) {
      const sliderCtrlC = L.DomUtil.create(
        'div',
        'sldr-ctrl-container',
        container,
      );
      const buttonContainer = L.DomUtil.create(
        'div',
        'button-container',
        sliderCtrlC,
      );
      this._makeButtons(buttonContainer);
      if (this.options.enableKeyboardControls) {
        this._addKeyListeners();
      }
      this._makeOutput(sliderCtrlC);
    }
    this._makeSlider(container);
    if (this.options.showTicks) {
      this._buildDataList(container);
    }
  },

  /**
   * Add keyboard listeners for keyboard control
   *
   * @private
  */
  _addKeyListeners() {
    this._listener = (...args) => this._onKeydown(...args);
    document.addEventListener('keydown', this._listener);
  },

  /**
   * Remove keyboard listeners
   *
   * @private
  */
  _removeKeyListeners() {
    document.removeEventListener('keydown', this._listener);
  },

  /**
   * Constructs a <datalist>, for showing ticks on the range input.
   *
   * @private
   * @param {HTMLElement} container The container to which to add the datalist
   */
  _buildDataList(container) {
    this._datalist = L.DomUtil.create('datalist', '', container);
    const idNum = Math.floor(Math.random() * 1000000);
    this._datalist.id = `timeline-datalist-${idNum}`;
    this._timeSlider.setAttribute('list', this._datalist.id);
    this._rebuildDataList();
  },

  /**
   * Reconstructs the <datalist>. Should be called when new data comes in.
  */
  _rebuildDataList() {
    const datalist = this._datalist;
    while (datalist.firstChild) {
      datalist.removeChild(datalist.firstChild);
    }
    const datalistSelect = L.DomUtil.create('select', '', this._datalist);
    this._getTimes().forEach((time) => {
      L.DomUtil.create('option', '', datalistSelect).value = time;
    });
  },

  /**
   * Makes a button with the passed name as a class, which calls the
   * corresponding function when clicked. Attaches the button to container.
   *
   * @private
   * @param {HTMLElement} container The container to which to add the button
   * @param {String} name The class to give the button and the function to call
  */
  _makeButton(container, name) {
    const button = L.DomUtil.create('button', name, container);
    button.addEventListener('click', () => this[name]());
    L.DomEvent.disableClickPropagation(button);
  },

  /**
   * Makes the prev, play, pause, and next buttons
   *
   * @private
   * @param {HTMLElement} container The container to which to add the buttons
  */
  _makeButtons(container) {
    this._makeButton(container, 'prev');
    this._makeButton(container, 'play');
    this._makeButton(container, 'pause');
    this._makeButton(container, 'next');
  },

  /**
   * DOM event handler to disable dragging on map
   * 
   * @private
  */
  _disableMapDragging() {
    this.map.dragging.disable();
  },

  /** 
   * DOM event handler to enable dragging on map
   * 
   * @private
  */
  _enableMapDragging() {
    this.map.dragging.enable();
  },

  /**
   * Creates the range input
   *
   * @private
   * @param {HTMLElement} container The container to which to add the input
  */
  _makeSlider(container) {
    const slider = L.DomUtil.create('input', 'time-slider', container);
    slider.type = 'range';
    slider.min = this.start || 0;
    slider.max = this.end || 0;
    slider.value = this.start || 0;
    this._timeSlider = slider;
    // register events using leaflet for easy removal
    L.DomEvent.on(this._timeSlider, 'change input', this._sliderChanged, this);
    L.DomEvent.on(this._timeSlider, 'pointerdown mousedown touchstart', this._disableMapDragging, this);
    L.DomEvent.on(document, 'pointerup mouseup touchend', this._enableMapDragging, this);
  },

  _makeOutput(container) {
    this._output = L.DomUtil.create('output', 'time-text', container);
    this._output.innerHTML = this.options.formatOutput(this.start);
  },

  _onKeydown(e) {
    switch (e.keyCode || e.which) {
      case 37: this.prev(); break;
      case 39: this.next(); break;
      case 32: this.toggle(); break;
      default: return;
    }
    e.preventDefault();
  },

  _sliderChanged(e) {
    const time = parseFloat(+e.target.value, 10);
    this.time = time;
    if (!this.options.waitToUpdateMap || e.type === 'change') {
      this.timelines.forEach(timeline => timeline.setTime(time));
    }
    if (this._output) {
      this._output.innerHTML = this.options.formatOutput(time);
    }
  },

  _resetIfTimelinesChanged(oldTimelineCount) {
    if (this.timelines.length !== oldTimelineCount) {
      this._recalculate();
      if (this.options.showTicks) {
        this._rebuildDataList();
      }
      this.setTime(this.start);
    }
  },

  /* EXTERNAL API *************************************************************/

  /**
   * Register timeline layers with this control. This could change the start and
   * end points of the timeline (unless manually set). It will also reset the
   * playback.
   *
   * @param {...L.Timeline} timelines The `L.Timeline`s to register
  */
  addTimelines(...timelines) {
    this.pause();
    const timelineCount = this.timelines.length;
    timelines.forEach((timeline) => {
      if (this.timelines.indexOf(timeline) === -1) {
        this.timelines.push(timeline);
      }
    });
    this._resetIfTimelinesChanged(timelineCount);
  },

  /**
   * Unregister timeline layers with this control. This could change the start
   * and end points of the timeline unless manually set. It will also reset the
   * playback.
   *
   * @param {...L.Timeline} timelines The `L.Timeline`s to unregister
  */
  removeTimelines(...timelines) {
    this.pause();
    const timelineCount = this.timelines.length;
    timelines.forEach((timeline) => {
      const index = this.timelines.indexOf(timeline);
      if (index !== -1) {
        this.timelines.splice(index, 1);
      }
    });
    this._resetIfTimelinesChanged(timelineCount);
  },

  /**
   * Toggles play/pause state.
   */
  toggle() {
    if (this._playing) {
      this.pause();
    } else {
      this.play();
    }
  },

  /**
   * Pauses playback and goes to the previous event.
  */
  prev() {
    this.pause();
    const prevTime = this._nearestEventTime(this.time, -1);
    this._timeSlider.value = prevTime;
    this.setTime(prevTime);
  },

  /**
   * Pauses playback.
  */
  pause(fromSynced) {
    clearTimeout(this._timer);
    this._playing = false;
    this.container.classList.remove('playing');

    if (this.syncedControl && !fromSynced) {
      this.syncedControl.map(function (control) {
        control.pause(true);
      })
    }
  },

  /**
   * Starts playback.
  */
  play(fromSynced) {
    clearTimeout(this._timer);
    if (parseFloat(this._timeSlider.value, 10) === this.end) {
      this._timeSlider.value = this.start;
    }
    this._timeSlider.value = parseFloat(this._timeSlider.value, 10) +
      this._stepSize;
    this.setTime(this._timeSlider.value);
    if (parseFloat(this._timeSlider.value, 10) === this.end) {
      this._playing = false;
      this.container.classList.remove('playing');
    } else {
      this._playing = true;
      this.container.classList.add('playing');
      this._timer = setTimeout(() => this.play(true), this._stepDuration);
    }

    if (this.syncedControl && !fromSynced) {
      this.syncedControl.map(function (control) {
        control.play(true);
      });
    }
  },

  /**
   * Pauses playback and goes to the next event.
  */
  next() {
    this.pause();
    const nextTime = this._nearestEventTime(this.time, 1);
    this._timeSlider.value = nextTime;
    this.setTime(nextTime);
  },

  /**
   * Set the time displayed.
   *
   * @param {Number} time The time to set
  */
  setTime(time) {
    if (this._timeSlider) this._timeSlider.value = +time;
    this._sliderChanged({
      type:   'change',
      target: { value: time },
    });
  },

  onAdd(map) {
    this.map = map;
    this._createDOM();
    this.setTime(this.start);
    return this.container;
  },

  onRemove() {
    /* istanbul ignore else */
    if (this.options.enableKeyboardControls) {
      this._removeKeyListeners();
    }
    // cleanup events registered in _makeSlider
    L.DomEvent.off(this._timeSlider, 'change input', this._sliderChanged, this);
    L.DomEvent.off(this._timeSlider, 'pointerdown mousedown touchstart', this._disableMapDragging, this);
    L.DomEvent.off(document, 'pointerup mouseup touchend', this._enableMapDragging, this);
    // make sure that dragging is restored to enabled state
    this._enableMapDragging();
  },

  syncControl(controlToSync) {
    if (!this.syncedControl) {
      this.syncedControl = [];
    }
    this.syncedControl.push(syncedControl);
  }
});

L.timelineSliderControl = (timeline, start, end, timelist) =>
  new L.TimelineSliderControl(timeline, start, end, timelist);
