'use strict';

//Extend D3 to add size()
d3.selection.prototype.size = function () {
    var n = 0;
    this.each(function () {
        ++n;
    });
    return n;
};


ofp.Layer = function (layerType, floorplan) {

    this.name = layerType.name;
    this.layerType = layerType;

    //Private
    var parent = floorplan,
        that = this;

    /**
     * Repair missing information from the data standard
     */
    function repair () {
        //assign className if missing by using group ids
        that.layerType.idList.forEach(function (element, index, array) {
            var selection = parent.svg.selectAll(element);
            if (selection && selection.size() > 0 && !selection.classed(that.layerType.className)) {
                console.log("Repairing className: " + that.layerType.className + " for " + selection.size() + " elements with id " + element);
                selection.classed(that.layerType.className, true);
            }
        });
    }

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

    //Initialize
    repair();
    this.layer = parent.svg.selectAll('.' + layerType.className);
    this.elements = this.layer.selectAll('polygon, line, path, text');

    console.log("Initialized Layer: " + this.layerType.name + " with " + this.elements.size() + " elements.");
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
