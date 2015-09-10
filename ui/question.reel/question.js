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

    enterDocument: {
        value: function (firstTime) {
            if (firstTime) {
                this.addEventListener("questionTransition", this, false);
                this.addEventListener("nextQuestion", this, false);
            }
        }
    },

    handleNextQuestion: {
        value: function () {
            var self = this;
            var question = this.application.quizController.getNextQuestion();
            if (question) {
                this.data = question;
                this.classList.add("transition-in");
                this.classList.remove("transition-out");
            } else {
                setTimeout(function(){
                    self.classList.add("transition-in");
                    self.classList.remove("transition-out");
                }, 1000);

            }

        }
    },

    handleQuestionTransition: {
        value: function () {
            this.classList.add("transition-out");
            this.classList.remove("transition-in");
        }
    }
});
