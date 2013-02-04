/*
 * Copyright (c) 2013 SYNCADD Systems, Inc.
 * All rights reserved.
 * NOT FOR RELEASE/DISTRIBUTION - License TBD
 * Please contact: Kristofor Carle kristofor.carle@syncadd.com
 */

'use strict';

//Extend D3 to add size()
d3.selection.prototype.size = function() {
	var n = 0;
	this.each(function () { ++n; });
	return n;
};


ofp.Layer = function (layerType, floorplan) {
	this.name = layerType.name;
	this.layerType = layerType;
	this.layer = d3.selectAll(layerType.idList.join());

	//Private
	var parent = floorplan,
		that = this;

	function destroy() {
		that.name = null;
		that.layerType = null;
		that.layer = null;
	}

	//Privileged
	this.remove = function () {
		//remove the content
		this.layer.remove();
		//reset to empty selection
		this.layer = d3.selectAll(this.layerType.idList.join());
	};
};

//Public
ofp.Layer.prototype = {
	name: "",
	layerType: null,
	layer: null,

	/**
	 * hide the layer
	 */
	hide: function () {
		this.layer.style("display", 'none');
	},
	show: function () {
		this.layer.style("display", '');
	},
	size: function () {
		return this.layer.size();
	}

};
