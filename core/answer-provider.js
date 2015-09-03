/**
 * @module answer-provider
 */
var Montage = require("montage/core/core").Montage,
    Answer = require('model/answer').Answer;
/**
 * @class AnswerProvider
 * @extends Montage
 */
exports.AnswerProvider = Montage.specialize(/** @lends AnswerProvider# */ {

    answers: {
        value: null
    },

    constructor: {
        value: function() {
            this.answers = [];
        }
    },

    save: {
        value: function(index, answer, isCorrect) {
            var answerData = new Answer(null, index, answer, isCorrect);
            this.answers.push(answerData);
        }
    }
});







