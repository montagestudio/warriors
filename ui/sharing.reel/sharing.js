/**
 * @module ui/sharing.reel
 */
var Component = require("montage/ui/component").Component;

/**
 * @class Sharing
 * @extends Component
 */
exports.Sharing = Component.specialize(/** @lends Sharing# */ {
    prepareForActivationEvents: {
        value: function () {
            this.facebookShareElement.addEventListener("click", this, false);
        }
    },
    handleClick: {
        value: function (event) {
            var dataObj = {'articleTitle':"How well do you know the 2015 NBA Champions?","image":window.location.href+"assets/image/CoverImage.png"};
            var shareEvent = new CustomEvent('shareOnFB',{ 'detail': dataObj });
            dispatchEvent(shareEvent);
        }
    },

});
