require("./core/core");

require("util").puts(JSON.stringify({
	"name": "openfloorplan",
	"version": "0.0.1",
	"description": "Library for interacting with the Open Floor Plan Markup Language.",
	"keywords": [
		"floor plan",
		"facility management",
		"svg",
		"d3"
	],
	"homepage": "http://syncadd.com",
	"author": {
		"name": "SYNCADD Systems, Inc.",
		"url": "http://syncadd.com"
	},
	"repository": {
		"type": "git",
		"url": "https://bitbucket.org/syncadd/openfloorplan.git"
	},
	"main": "index.js",
	"jam": {
		"main": "ofp.js",
		"shim": {
			"exports": "ofp"
		}
	},
	"dependencies": {
		"d3": ">=3.0.5"
	},
	"devDependencies": {
		"uglify-js": "2.2.3",
		"vows": "0.7.0"
	},
	"scripts": {
		"test": "./node_modules/vows/bin/vows"
	}
}, null, 2));
