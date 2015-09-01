/**
 * @module ui/menu.reel
 */
var Component = require("montage/ui/component").Component;

// $question: should I be loading the questions again here? Doesn't seem so.

/**
 * @class Menu
 * @extends Component
 */
exports.Menu = Component.specialize(/** @lends Menu# */ {
    constructor: {
        value: function Menu() {
            this.super();
        }
    },

    isMenuOpen: {
        value: false
    },

    handleMenuToggleAction: {
        value: function () {
            if(this.isMenuOpen) {
                this.isMenuOpen = false;
            } else {
                this.isMenuOpen = true;
            }
        }
    }
});
