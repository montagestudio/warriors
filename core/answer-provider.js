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

    _answers: {
        value: []
    },

    save: {
        value: function(index, answer, isCorrect) {
        }
    }
});







