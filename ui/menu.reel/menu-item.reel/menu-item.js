/**
 * @module ui/menu-item.reel
 */
var Component = require("montage/ui/component").Component;

/**
 * @class MenuItem
 * @extends Component
 */
exports.MenuItem = Component.specialize(/** @lends MenuItem# */ {
    constructor: {
        value: function MenuItem() {
            this.super();
        }
    }
});
