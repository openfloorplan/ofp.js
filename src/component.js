/*
 * Copyright (c) 2013 SYNCADD Systems, Inc.
 * All rights reserved.
 * NOT FOR RELEASE/DISTRIBUTION - License TBD
 * Please contact: Kristofor Carle kristofor.carle@syncadd.com
 */

require("./core/core");

require("util").puts(JSON.stringify({
    "name": "openfloorplan",
    "version": ofp.version,
    "main": "./ofp.js"
}, null, 2));
