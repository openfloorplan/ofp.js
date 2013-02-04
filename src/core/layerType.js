/*
 * Copyright (c) 2013 SYNCADD Systems, Inc.
 * All rights reserved.
 * NOT FOR RELEASE/DISTRIBUTION - License TBD
 * Please contact: Kristofor Carle kristofor.carle@syncadd.com
 */



'use strict';

ofp.LayerType = function (name, idList) {
  this.name = name;
  this.idList = idList;
};

ofp.LayerType.prototype = {
	name: '',
	idList: []
};

ofp.LayerType.Space = new ofp.LayerType('Space', ['#bgspa_space_area_b']);
ofp.LayerType.Column = new ofp.LayerType('Space', ['#Column', '#bgspa_column_area_b']);
ofp.LayerType.Construction = new ofp.LayerType('Space', ['#Constructions', '#Frames']);
ofp.LayerType.DimensionAnnotations = new ofp.LayerType('Space', ['#A-ANNO-DIMS', '#Dimension']);

