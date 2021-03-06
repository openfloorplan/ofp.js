ofp = {
  version: "0.0.1"
};

"use strict";

d3.selection.prototype.size = function() {
  var n = 0;
  this.each(function() {
    ++n;
  });
  return n;
};

ofp.Layer = function(layerType, floorplan) {
  this.name = layerType.name;
  this.layerType = layerType;
  var parent = floorplan, that = this;
  function repair() {
    that.layerType.idList.forEach(function(element, index, array) {
      var selection = parent.svg.selectAll(element);
      if (selection && selection.size() > 0 && !selection.classed(that.layerType.className)) {
        selection.classed(that.layerType.className, true);
      }
    });
  }
  function destroy() {
    that.name = null;
    that.layerType = null;
    that.layer = null;
  }
  this.remove = function() {
    this.layer.remove();
    this.layer = d3.selectAll(this.layerType.idList.join());
  };
  repair();
  this.layer = parent.svg.selectAll("." + layerType.className);
  this.elements = this.layer.selectAll("polygon, line, path, text");
  console.log("Initialized Layer: " + this.layerType.name + " with " + this.elements.size() + " elements.");
};

ofp.Layer.prototype = {
  name: "",
  layerType: null,
  layer: null,
  hide: function() {
    this.layer.style("display", "none");
  },
  show: function() {
    this.layer.style("display", "");
  },
  size: function() {
    return this.layer.size();
  }
};

"use strict";

ofp.LayerType = function(name, className, idList) {
  this.name = name;
  this.className = className;
  this.idList = idList;
};

ofp.LayerType.prototype = {
  name: "",
  className: "",
  idList: []
};

ofp.LayerType.Space = new ofp.LayerType("Space", "ofp-space", [ "#bgspa_space_area_b" ]);

ofp.LayerType.Column = new ofp.LayerType("Column", "ofp-column", [ "#Column", "#bgspa_column_area_b" ]);

ofp.LayerType.Construction = new ofp.LayerType("Construction", "ofp-construction", [ "#Constructions", "#Frames" ]);

ofp.LayerType.DimensionAnnotations = new ofp.LayerType("Dimension Annotations", "ofp-annotations-dimensions", [ "#Dimension", "#A-ANNO-DIMS" ]);

ofp.FloorPlan = function(container, layerTypes) {
  "use strict";
  var groups, groupsArr, group, layerType, i;
  this.svg = d3.select(container).select("svg");
  if (layerTypes) {
    var x;
    for (x in layerTypes) {
      if (layerTypes.hasOwnProperty(x)) {
        this[x] = new ofp.Layer(layerTypes[x], this);
        this.layers.push(this[x]);
      }
    }
  } else {
    groups = this.svg.selectAll("g");
    groupsArr = groups[0];
    for (i = 0; i < groupsArr.length; i++) {
      group = groupsArr[i];
      if (group.id) {
        if (group.id.match(/^[0-9]/m)) {
          group.id = "a" + group.id;
        }
        group.id = group.id.replace(/ /gm, "");
        layerType = new ofp.LayerType(group.id, "ofp-" + group.id, [ "#" + group.id ]);
        this[group.id] = new ofp.Layer(layerType, this);
        this.layers.push(this[group.id]);
      }
    }
    if (!groupsArr || groupsArr.length === 0) {
      this.spaces = new ofp.Layer(ofp.LayerType.Space, this);
      this.layers.push(this.spaces);
      this.columns = new ofp.Layer(ofp.LayerType.Column, this);
      this.layers.push(this.columns);
      this.constructions = new ofp.Layer(ofp.LayerType.Construction, this);
      this.layers.push(this.constructions);
      this.dimensionAnnotations = new ofp.Layer(ofp.LayerType.DimensionAnnotations, this);
      this.layers.push(this.dimensionAnnotations);
    }
  }
  var parent = container;
  function getInnerHTML() {
    return parent.innerHTML;
  }
  this.exportSVG = function() {
    var svgString = getInnerHTML(), svgPrefix = '<?xml version="1.0" encoding="iso-8859-1"?>' + "\n" + "<!DOCTYPE svg [ " + "\n" + "]>" + "\n";
    svgString = svgString.replace(/^\s+|\s+$/g, "");
    svgString = svgString.replace(/^]/gm, "");
    svgString = svgString.replace(/!\[CDATA/gm, "<![CDATA");
    svgString = svgString.replace(/baseprofile/gm, "baseProfile");
    svgString = svgString.replace(/viewbox/gm, "viewBox");
    svgString = svgString.replace(/preserveaspectratio/gm, "preserveAspectRatio");
    svgString = svgString.replace(/patternunits/gm, "patternUnits");
    return svgPrefix + svgString;
  };
};

ofp.FloorPlan.prototype = {
  svg: null,
  layers: [],
  getViewBox: function() {
    "use strict";
    var svgEl, viewBoxArr, viewBox;
    svgEl = this.svg[0][0];
    if (svgEl && svgEl.viewBox && svgEl.viewBox.baseVal) {
      viewBox = svgEl.viewBox.baseVal;
    } else {
      viewBoxArr = svgEl.attributes.viewbox._nodeValue.split(" ");
      viewBox = {
        x: viewBoxArr[0],
        y: viewBoxArr[1],
        width: viewBoxArr[2],
        height: viewBoxArr[3]
      };
    }
    viewBox.toString = function() {
      return "SVG ViewBox xMin:" + this.x + " yMin:" + this.y + " width:" + this.width + " height:" + this.height;
    };
    console.log(viewBox.toString());
    return viewBox;
  },
  getAvailableLayers: function() {
    "use strict";
    var availableLayers = [];
    this.layers.forEach(function(element) {
      if (element.size() > 0) {
        availableLayers.push(element);
      }
    });
    return availableLayers;
  }
};