/**
 * @module ui/montage-tag.reel
 */

var Button = require("montage/ui/button.reel").Button;

/**
 * @class MontageTag
 * @extends Component
 */

var MontageTag = exports.MontageTag = Button.specialize(/** @lends MontageTag# */ {

    enterDocument: {
        value: function (isFirstTime) {
            this.super(isFirstTime);
            if (isFirstTime) {
                this._element.addEventListener("touchstart", this, false);
                this.classList.add("isMouse");
            }
        }
    },

    handleTouchstart: {
        value: function (event) {
            this.super(event);
            this.classList.remove("isMouse");
        }
    },

    hasTemplate: {
        value: true
    },

    _collapseTimeout: {
        value: null
    },

    handleAction: {
        value: function () {
            var linkOpacity = getComputedStyle(this.linkElement).getPropertyValue("opacity") * 1,
                self = this;

            this.classList.add("expanded");
            clearTimeout(this._collapseTimeout);
            this._collapseTimeout = setTimeout(function () {
                self.classList.remove("expanded");
            }, 5000);
            if (linkOpacity > .1) {
                window.open("http://www.montagestudio.com", '_blank');
            }
        }
    }

});
