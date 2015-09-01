/**
 * @module question-provider
 */
var Montage = require("montage/core/core").Montage,
    Quiz = require('model/quiz').Quiz,
    quiz = require("../../assets/quiz.json");
/**
 * @class QuizProvider
 * @extends Montage
 */
exports.QuizProvider = Montage.specialize(/** @lends QuizProvider# */ {

    _quiz: {
        value: null
    },

    constructor: {
        value: function() {
            this._quiz = Quiz.load(quiz);
        }
    },

    getTitle: {
        value: function() {
            return this._quiz.title;
        }
    },

    getQuestion: {
        value: function(index) {
            return this._quiz.questions[index];
        }
    }
});







