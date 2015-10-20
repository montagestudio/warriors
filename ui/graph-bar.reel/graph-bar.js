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

    handleAnimationend: {
        value: function () {
            console.log('testing handle animation end');
        }
    },

    enterDocument: {
        value: function (isFirstTime) {
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
                this.barElement.style[this.cssTransform] = "translateX(" + (this.percentage - 100)  + "%)";
            }
        }
    },
});
