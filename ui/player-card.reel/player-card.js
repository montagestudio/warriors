/**
 * @module ui/player-card.reel
 */
var Button = require("montage/ui/button.reel").Button;

/**
 * @class PlayerCard
 * @extends Button
 */

var PlayerCard = exports.PlayerCard = Button.specialize( /** @lends PlayerCard# */ {

    hasTemplate: {
        value: true
    },

    _data: {
        value: null
    },

    showDetails: {
        value: false
    },

    // remove class when card isn't selected card

    removeShowDetails: {
        set: function () {
            this.classList.remove("show-details");
            this.showDetails = false;
        }
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
            this.super();
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

    handleAction: {
        value: function () {
            var i = 0;
            while (i < this.flow.content.length && this.flow.content[i] !== this.data) {
                i++;
            }
            if (i < this.flow.content.length) {
                if (i=== Math.round(this.flow.scroll)) {
                    if (this.mode == "browse"){
                        if (this.showDetails) {
                            this.showDetails = false;
                        } else {
                            this.showDetails = true;
                        }
                    } else {
                        if (this.application.quizController.answer(this.data)){
                            this.setCorrect();
                            this.reset();

                        } else {
                            this.setWrong();
                            this.reset();
                        }
                    }

                } else {
                   this.flow.startScrollingIndexToOffset(i,0);
                }

            }
        }
    }

});
