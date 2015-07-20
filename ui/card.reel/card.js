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
            if(this.classList.contains("show-details")) {
                this.showFront();
            } else {
                this.showBack();
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

    showBack: {
        value: function() {
            this.classList.add("show-details");
            this.classList.remove("hide-details");
        }
    },

    showFront: {
        value: function() {
            this.classList.add("hide-details");
            this.classList.remove("show-details");
            console.log("showBack");
        }
    }
});

