/*
 * Copyright (c) 2013 SYNCADD Systems, Inc.
 * All rights reserved.
 * NOT FOR RELEASE/DISTRIBUTION - License TBD
 * Please contact: Kristofor Carle kristofor.carle@syncadd.com
 */



'use strict';

ofp.LayerType = function (name, className, idList) {
    this.name = name;
    this.className = className;
    this.idList = idList;
};

ofp.LayerType.prototype = {
	name: '',
	className: '',
	idList: []
};

ofp.LayerType.Space = new ofp.LayerType('Space', 'ofp-space', ['#bgspa_space_area_b']);
ofp.LayerType.Column = new ofp.LayerType('Column', 'ofp-column', ['#Column', '#bgspa_column_area_b']);
ofp.LayerType.Construction = new ofp.LayerType('Construction', 'ofp-construction', ['#Constructions', '#Frames']);
ofp.LayerType.DimensionAnnotations = new ofp.LayerType('Dimension Annotations', 'ofp-annotations-dimensions',  ['#A-ANNO-DIMS', '#Dimension']);

