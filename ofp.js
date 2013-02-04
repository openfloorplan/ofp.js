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
  this.layer = d3.selectAll(layerType.idList.join());
  var parent = floorplan, that = this;
  function destroy() {
    that.name = null;
    that.layerType = null;
    that.layer = null;
  }
  this.remove = function() {
    this.layer.remove();
    this.layer = d3.selectAll(this.layerType.idList.join());
  };
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

ofp.LayerType = function(name, idList) {
  this.name = name;
  this.idList = idList;
};

ofp.LayerType.prototype = {
  name: "",
  idList: []
};

ofp.LayerType.Space = new ofp.LayerType("Space", [ "#bgspa_space_area_b" ]);

ofp.LayerType.Column = new ofp.LayerType("Space", [ "#Column", "#bgspa_column_area_b" ]);

ofp.LayerType.Construction = new ofp.LayerType("Space", [ "#Constructions", "#Frames" ]);

ofp.LayerType.DimensionAnnotations = new ofp.LayerType("Space", [ "#A-ANNO-DIMS", "#Dimension" ]);

"use strict";

ofp.FloorPlan = function(container) {
  this.svg = d3.select(container).select("svg");
  this.spaces = new ofp.Layer(ofp.LayerType.Space);
  this.columns = new ofp.Layer(ofp.LayerType.Column);
  this.constructions = new ofp.Layer(ofp.LayerType.Construction);
  this.dimensionAnnotations = new ofp.Layer(ofp.LayerType.DimensionAnnotations);
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