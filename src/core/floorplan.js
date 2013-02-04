/*
 * Copyright (c) 2013 SYNCADD Systems, Inc.
 * All rights reserved.
 * NOT FOR RELEASE/DISTRIBUTION - License TBD
 * Please contact: Kristofor Carle kristofor.carle@syncadd.com
 */

'use strict';

ofp.FloorPlan = function (container) {
	this.svg = d3.select(container).select("svg");

	this.spaces = new ofp.Layer(ofp.LayerType.Space, this);
	console.log("Layer "+ this.spaces.layerType.name + " has " + this.spaces.elements.size() + " elements.");
	this.columns = new ofp.Layer(ofp.LayerType.Column, this);
	console.log("Layer "+ this.columns.layerType.name + " has " + this.columns.elements.size() + " elements.");
	this.constructions = new ofp.Layer(ofp.LayerType.Construction, this);
	console.log("Layer "+ this.constructions.layerType.name + " has " + this.constructions.elements.size() + " elements.");
	this.dimensionAnnotations = new ofp.Layer(ofp.LayerType.DimensionAnnotations, this);
	console.log("Layer "+ this.dimensionAnnotations.layerType.name + " has " + this.dimensionAnnotations.elements.size() + " elements.");

	//private
	var parent = container;

	function getInnerHTML() {
		return parent.innerHTML;
	}

	//privileged
	this.exportSVG = function () {
		var svgString = getInnerHTML(),

		//Restore XML prefix
			svgPrefix =  '<?xml version="1.0" encoding="iso-8859-1"?>' + '\n' +
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

	/**
	 * Get ViewBox
	 * @return {{xMin: *, yMin: null, width: null, height: null, toString: Function}}
	 */
	getViewBox: function () {
		var  svgEl, viewBoxArr, viewBox;
		svgEl = this.svg[0][0];
		viewBoxArr = svgEl.attributes.viewbox._nodeValue.split(' '); //has to be done the hard way without browser SVG support

		viewBox = {
			xMin: viewBoxArr[0],
			yMin: viewBoxArr[1],
			width: viewBoxArr[2],
			height: viewBoxArr[3],
			toString: function () {
				return "SVG ViewBox xMin:" + this.xMin + ' yMin:' + this.yMin + ' width:' + this.width + ' height:' + this.height;
			}
		};

		console.log(viewBox.toString());
		return viewBox;
	}




};