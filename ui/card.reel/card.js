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

    enterDocument: {
        value: function() {
            this.element.addEventListener('click', this, false);
        }
    },

    handleClick: {
        value: function() {
            if(this._cardView == "cardFront") {
                this.showBack();
            } else {
                this.showFront();
            }
            console.log("click");
        }
    },

    draw: {
        value: function() {
            if (this.data) {
                this.playerImage.style.backgroundImage = "url(" + this.data.image + ")";
            }
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
    }
});

