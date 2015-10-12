var Component = require("montage/ui/component").Component;

var QuestionOption = exports.QuestionOption = Component.specialize({

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

    setCorrect: {
        value: function () {
            this.classList.add("is-correct");
            this.classList.add("answered");
        }
    },

    setWrong: {
        value: function () {
            this.classList.add("is-wrong");
            this.classList.add("answered");
        }
    },

    reset: {
        value: function () {
            var self = this;
            setTimeout(function () {
                self.dispatchEventNamed("questionTransition", true, true);

                setTimeout(function () {
                    self.dispatchEventNamed("nextQuestion", true, true);
                    self.classList.remove("is-wrong");
                    self.classList.remove("is-correct");
                    self.classList.remove("answered");
                    self._isAnwsered = false;
                }, 500);

            }, 1000);
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
                if (this.application.quizController.answer(this.data)){
                    this.setCorrect();
                    this.reset();

                } else {
                    this.setWrong();
                    this.reset();
                }
            }
        }
    }

});

