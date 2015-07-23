var Component = require("montage/ui/component").Component;

var Card = exports.Card = Component.specialize( {

    enterDocument: {
        value: function() {
            this.element.addEventListener('click', this, false);
        }
    },

    handleClick: {
        value: function() {

            // check to see if clicked object matches object at currentIndex

            if (this.data == this.flowContent[this.currentIndex]) {
                if (this.classList.contains("show-details")) {
                    this.hideDetails();
                } else {
                    this.showDetails();
                }
            }
        }
    },

    draw: {
        value: function() {
            if (this.data) {
                this.playerImage.style.backgroundImage = "url(" + this.data.image + ")";
            }
        }
    },

    showDetails: {
        value: function() {
            this.classList.add("show-details");
            this.classList.remove("hide-details");
        }
    },

    hideDetails: {
        value: function() {
            this.classList.add("hide-details");
            this.classList.remove("show-details");
        }
    }
});

