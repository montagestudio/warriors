var Component = require("montage/ui/component").Component;

var QuestionOption = exports.QuestionOption = Component.specialize( {

    prepareForActivationEvents: {
        value: function () {
            this.element.addEventListener('click', this, false);
        }
    },

    _data: {
        value: null
    },

    data: {
        get: function () {
            return this._data;
        },
        set: function (value) {
            if (this._data !== value) {
                this._data = value;
                this.needsDraw = true;
            }
        }
    },

    draw: {
        value: function () {
            if (this.data) {
                this.playerImage.style.backgroundImage = "url(" + this.data.image + ")";
            }
        }
    },

    handleClick: {
        value: function (e) {

            // check to see if clicked object matches object at currentIndex and isn't a click of the selectItem button
            // check popcorn for selected / active state when in middle
            // selected state as used in popcorn doesn't work because as soon as you click it is "selected"

            // set flag in bindings to check
            // check scope in FRB for binding

            if (this.data == this.flowContent[this.currentIndex] && e.target !== this.selectItem) {
                if (this.classList.contains("show-details")) {
                    this.hideDetails();
                } else {
                    this.showDetails();
                }
            }
        }
    },

    showDetails: {
        value: function () {
            this.classList.add("show-details");
            this.classList.remove("hide-details");
        }
    },

    hideDetails: {
        value: function () {
            this.classList.add("hide-details");
            this.classList.remove("show-details");
        }
    },

    handleSelectItemAction: {
        value: function () {
            this.parentComponent.parentComponent.parentComponent.parentComponent.goToNextQuestion();
        }
    }
});

