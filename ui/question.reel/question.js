/**
 * @module ui/question.reel
 */
var Component = require("montage/ui/component").Component;

/**
 * @class Question
 * @extends Component
 */
exports.Question = Component.specialize(/** @lends Question# */ {
    constructor: {
        value: function Question() {
            this.super();
        }
    },

    _data: {
        value: null
    },

    data: {
        set: function(value) {
            if(value !== this._data) {
                this._data = value;
                this.needsDraw = true;
            }
        },

        get: function () {
            return this._data;
        }
    },

    goToNextQuestion: {
        value: function () {
            var question = this.application.quizController.getNextQuestion();
            if (question) {
                this.data = question;
            } else {
                console.log("You're at the last question");
            }
        }
    },

    enterDocument: {
        value: function (firstTime) {
            if (firstTime) {
                this.addEventListener("submitAnswer", this, false);
            }
        }
    },

    handleSubmitAnswer: {
        value: function () {
            this.goToNextQuestion();
            // this.classList.add("transition");
        }
    }
});
