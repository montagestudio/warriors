/**
 * @module answer-controller
 */
var Montage = require("montage/core/core").Montage,
    Promise = require("montage/core/promise").Promise.Promise;
/**
 * @class AnswerController
 * @extends Montage
 */
exports.AnswerController = Montage.specialize(/** @lends AnswerController# */ {

    questionAnswered: {
        value: null
    },

    questionIndex: {
        value: null
    },

    correctness: {
        value: null
    },

    recordAnswer: {
        value: function(index, answer, correctness) {
            this.questionAnswered = answer;
            this.questionIndex = index;
            this.correctness = correctness;
            return this.correctness;
        }
    }
});







