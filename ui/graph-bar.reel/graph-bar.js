/**
 * @module ui/graph-bar.reel
 */
var Component = require("montage/ui/component").Component;

/**
 * @class GraphBar
 * @extends Component
 */
exports.GraphBar = Component.specialize(/** @lends GraphBar# */ {
    constructor: {
        value: function GraphBar() {
            this.super();
        }
    },

    enterDocument: {
        value: function () {
            if (!this.cssTransform) {// check for transform support
                if("webkitTransform" in this._element.style) {
                    this.cssTransform = "webkitTransform";
                } else if("MozTransform" in this._element.style) {
                    this.cssTransform = "MozTransform";
                } else if("oTransform" in this._element.style) {
                    this.cssTransform= "oTransform";
                } else {
                    this.cssTransform = "transform";
                }
            }
        }
    },

    draw: {
        value: function () {
            if (this.value !== null) {
                var self = this;
                setTimeout(function(){
                    self.barElement.style[self.cssTransform] = "translateX(" + (self.percentage - 100)  + "%)";
                }, 1000);
            }
        }
    },

    exitDocument: {
        value: function () {
            this.barElement.style[this.cssTransform] = "translateX(" + -100 + "%)";
        }
    }
});
