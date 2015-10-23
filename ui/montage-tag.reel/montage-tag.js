/**
 * @module ui/montage-tag.reel
 */

var Button = require("montage/ui/button.reel").Button;

/**
 * @class MontageTag
 * @extends Component
 */

var MontageTag = exports.MontageTag = Button.specialize(/** @lends MontageTag# */ {

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
            if (linkOpacity > 0) {
                window.open("http://www.montagestudio.com", '_blank');
            }
        }
    }

});
