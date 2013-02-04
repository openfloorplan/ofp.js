# See the README for installation instructions.

NODE_PATH ?= ./node_modules
JS_UGLIFY = $(NODE_PATH)/uglify-js/bin/uglifyjs
JS_TESTER = $(NODE_PATH)/vows/bin/vows
LOCALE ?= en_US

all: \
	ofp.js \
	ofp.min.js \
	component.json \
	package.json

# Modify this rule to build your own custom release.

.INTERMEDIATE ofp.js: \
	ofp.core.js

ofp.core.js: \
	src/core/core.js \
	src/core/layer.js \
	src/core/layerType.js \
	src/core/floorplan.js


test: all
	@$(JS_TESTER)

%.min.js: %.js Makefile
	@rm -f $@
	$(JS_UGLIFY) $< -c -m -o $@

ofp%js: Makefile
	@rm -f $@
	@cat $(filter %.js,$^) > $@.tmp
	$(JS_UGLIFY) $@.tmp -b indent-level=2 -o $@
	@rm $@.tmp
	@chmod a-w $@

component.json: src/component.js
	@rm -f $@
	node src/component.js > $@
	@chmod a-w $@

package.json: src/package.js
	@rm -f $@
	node src/package.js > $@
	@chmod a-w $@


clean:
	rm -f ofp*.js package.json component.json
