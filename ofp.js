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
      console.log("Found " + selection.size() + " elements with id " + element);
      selection.classed(that.layerType.className, true);
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

ofp.LayerType.DimensionAnnotations = new ofp.LayerType("Dimension Annotations", "ofp-annotations-dimensions", [ "#A-ANNO-DIMS", "#Dimension" ]);

"use strict";

ofp.FloorPlan = function(container) {
  this.svg = d3.select(container).select("svg");
  this.spaces = new ofp.Layer(ofp.LayerType.Space, this);
  console.log("Layer " + this.spaces.layerType.name + " has " + this.spaces.elements.size() + " elements.");
  this.columns = new ofp.Layer(ofp.LayerType.Column, this);
  console.log("Layer " + this.columns.layerType.name + " has " + this.columns.elements.size() + " elements.");
  this.constructions = new ofp.Layer(ofp.LayerType.Construction, this);
  console.log("Layer " + this.constructions.layerType.name + " has " + this.constructions.elements.size() + " elements.");
  this.dimensionAnnotations = new ofp.Layer(ofp.LayerType.DimensionAnnotations, this);
  console.log("Layer " + this.dimensionAnnotations.layerType.name + " has " + this.dimensionAnnotations.elements.size() + " elements.");
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
  getViewBox: function() {
    var svgEl, viewBoxArr, viewBox;
    svgEl = this.svg[0][0];
    viewBoxArr = svgEl.attributes.viewbox._nodeValue.split(" ");
    viewBox = {
      xMin: viewBoxArr[0],
      yMin: viewBoxArr[1],
      width: viewBoxArr[2],
      height: viewBoxArr[3],
      toString: function() {
        return "SVG ViewBox xMin:" + this.xMin + " yMin:" + this.yMin + " width:" + this.width + " height:" + this.height;
      }
    };
    console.log(viewBox.toString());
    return viewBox;
  }
};