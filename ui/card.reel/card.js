var Component = require("montage/ui/component").Component;

var Card = exports.Card = Component.specialize( {

    // _data: {value: null},

    // data: {
    //     set: function(value) {
    //         if(value !== this._data) {
    //             this._data = value;
    //             this.needsDraw = true;
    //         }
    //     }
    // },

    draw: {
        value: function() {
            this.playerImage.style.backgroundImage = "url(" + this.data.image + ")";
        }
    },

    _cardView: {value: "cardFront"},

    showFront: {
        value: function() {
            this._cardView = "cardFront";
        }
    },

    showBack: {
        value: function() {
            this._cardView = "cardBack";
        }
    },

    handleInfoButtonAction: {
        value: function() {
            this.showBack();
        }
    },

    handleBackButtonAction: {
        value: function() {
            this.showFront();
        }
    }
});

