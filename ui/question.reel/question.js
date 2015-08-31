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

    // creating current question variable

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
            var self = this;
            this.application.QuizController.getNextQuestion()
            .then(
                function(value) {
                    self.data = value;
                })
            .catch(
                function(reason){
                    console.log("you are at the last question");
                });
        }
    },

    enterDocument: {
        value: function (firstTime) {
            if (firstTime) {
                this.addEventListener("nextQuestion", this, false)
            }
        }
    },

    handleNextQuestion: {
        value: function () {
            this.goToNextQuestion();
        }
    },

    templateDidLoad: {
        value: function () {

        }
    }
});
