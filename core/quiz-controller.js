/**
 * @module quiz-controller
 */
var Montage = require("montage/core/core").Montage,
    Promise = require("montage/core/promise").Promise.Promise;
/**
 * @class QuizController
 * @extends Montage
 */
exports.QuizController = Montage.specialize(/** @lends QuizController# */ {

    _questionController: {
        value: null
    },

    _answerController: {
        value: null
    },

    _currentQuestionIndex: {
        value: null
    },

    _currentQuestion: {
        value: null
    },

    constructor: {
        value: function(questionController, answerController) {
            this._questionController = questionController;
            this._answerController = answerController;
            this._currentQuestionIndex = -1;
        }
    },

    getNextQuestion: {
        value: function() {
        }
    },

    answer: {
        value: function(answer) {
        }
    }
});







