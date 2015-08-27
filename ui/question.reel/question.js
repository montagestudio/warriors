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
            this.application.QuestionController.getNext();
        }
    },

    // loading current question

    templateDidLoad: {
        value: function () {
            this.data = this.application.QuestionController.getNext();
        }
    }
});
