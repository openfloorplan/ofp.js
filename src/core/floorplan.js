

ofp.FloorPlan = function (container, layerTypes) {
    'use strict';

    this.svg = d3.select(container).select("svg");

    if (layerTypes) { //use user provided layer types
        var x;
        for (x in layerTypes) {
            if (layerTypes.hasOwnProperty(x)) {
                this[x] = layerTypes[x];
                this.layers.push(this[x]);
            }
        }
    } else { //use pre-configured layer types
        this.spaces = new ofp.Layer(ofp.LayerType.Space, this);
        this.layers.push(this.spaces);
        this.columns = new ofp.Layer(ofp.LayerType.Column, this);
        this.layers.push(this.columns);
        this.constructions = new ofp.Layer(ofp.LayerType.Construction, this);
        this.layers.push(this.constructions);
        this.dimensionAnnotations = new ofp.Layer(ofp.LayerType.DimensionAnnotations, this);
        this.layers.push(this.dimensionAnnotations);
    }
    //private
    var parent = container;

    function getInnerHTML() {
        return parent.innerHTML;
    }

    //privileged
    this.exportSVG = function () {
        var svgString = getInnerHTML(),

        //Restore XML prefix
            svgPrefix = '<?xml version="1.0" encoding="iso-8859-1"?>' + '\n' +
                '<!DOCTYPE svg [ ' + '\n' + ']>' + '\n';

        //trim
        svgString = svgString.replace(/^\s+|\s+$/g, '');
        //remove unmatched ]
        svgString = svgString.replace(/^]/gm, "");
        //fix CDATA missing <
        svgString = svgString.replace(/!\[CDATA/gm, "<![CDATA");

        //Restore camelcase on key attributes
        //baseProfile
        svgString = svgString.replace(/baseprofile/gm, "baseProfile");
        //viewBox
        svgString = svgString.replace(/viewbox/gm, "viewBox");
        //preserveAspectRatio
        svgString = svgString.replace(/preserveaspectratio/gm, "preserveAspectRatio");
        //patternUnits
        svgString = svgString.replace(/patternunits/gm, "patternUnits");

        return svgPrefix + svgString;
    };

};

//Public
ofp.FloorPlan.prototype = {
    svg: null,
    layers: [],

    /**
     * Get ViewBox
     * @return {{xMin: *, yMin: null, width: null, height: null, toString: Function}}
     */
    getViewBox: function () {
        'use strict';
        var svgEl, viewBoxArr, viewBox;
        svgEl = this.svg[0][0];

        if (svgEl && svgEl.viewBox && svgEl.viewBox.baseVal) {
            viewBox = svgEl.viewBox.baseVal;
        } else {
            //has to be done the hard way without browser SVG support
            viewBoxArr = svgEl.attributes.viewbox._nodeValue.split(' ');

            viewBox = {
                x: viewBoxArr[0],
                y: viewBoxArr[1],
                width: viewBoxArr[2],
                height: viewBoxArr[3]
            };
        }
        viewBox.toString = function () {
            return "SVG ViewBox xMin:" + this.x + ' yMin:' + this.y + ' width:' + this.width + ' height:' + this.height;
        };
        console.log(viewBox.toString());
        return viewBox;
    },

    getAvailableLayers: function () {
        'use strict';
        var availableLayers = [];
        this.layers.forEach(function (element) {
            if (element.size() > 0) {
                availableLayers.push(element);
            }
        });
        return availableLayers;
    }




};