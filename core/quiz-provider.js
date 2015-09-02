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

    quiz: {
        value: null
    },

    constructor: {
        value: function() {
            this.quiz = Quiz.load(quiz);
        }
    },

    getTitle: {
        value: function() {
            return this.quiz.title;
        }
    },

    getQuestion: {
        value: function(index) {
            return this.quiz.questions[index];
        }
    }
});







