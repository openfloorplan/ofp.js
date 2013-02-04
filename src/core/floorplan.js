/*
 * Copyright (c) 2013 SYNCADD Systems, Inc.
 * All rights reserved.
 * NOT FOR RELEASE/DISTRIBUTION - License TBD
 * Please contact: Kristofor Carle kristofor.carle@syncadd.com
 */

'use strict';

ofp.FloorPlan = function (container) {
	this.svg = d3.select(container).select("svg");

	this.spaces = new ofp.Layer(ofp.LayerType.Space);
	this.columns = new ofp.Layer(ofp.LayerType.Column);
	this.constructions = new ofp.Layer(ofp.LayerType.Construction);
	this.dimensionAnnotations = new ofp.Layer(ofp.LayerType.DimensionAnnotations);

};

ofp.FloorPlan.prototype = {
	svg: null,

	/**
	 * Get ViewBox
	 * @param svg
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