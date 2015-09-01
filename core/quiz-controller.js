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
            // this._questions = questionController._questions;
            this._answerController = answerController;
            this._currentQuestionIndex = -1;
        }
    },

    getNextQuestion: {
        value: function() {
            this._currentQuestionIndex++;
            var self = this;
            return this._questionController.getQuestion(this._currentQuestionIndex)
            .then(function(question){
                self._currentQuestion = question;
                return question;
            });
        }
    },

    answer: {
        value: function(answer) {
            this._answerController.recordAnswer(this._currentQuestionIndex, answer, function(answer) {
                if (answer == this._currentQuestion.answer) {
                    return true;
                } else {
                    return false;
                }
            });
        }
    }
});







