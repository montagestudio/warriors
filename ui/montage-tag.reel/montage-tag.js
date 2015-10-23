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

    handleAction: {
        value: function () {
            console.log('action');
            this.classList.add("expanded");
        }
    }
});
