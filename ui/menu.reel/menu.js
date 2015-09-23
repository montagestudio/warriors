/**
 * @module ui/menu.reel
 */
var Component = require("montage/ui/component").Component;

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

    toggleMenu: {
        value: function () {
            if(this.isMenuOpen) {
                this.isMenuOpen = false;
            } else {
                this.isMenuOpen = true;
            }
        }
    },

    handleMenuToggleAction: {
        value: function () {
            this.toggleMenu();
        }
    }
});
