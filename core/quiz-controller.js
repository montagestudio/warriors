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

    _questionProvider: {
        value: null
    },

    _answerProvider: {
        value: null
    },

    _currentQuestionIndex: {
        value: null
    },

    _currentQuestion: {
        value: null
    },

    constructor: {
        value: function() {
            this._currentQuestionIndex = -1;
        }
    },

    init: {
        value: function(questionProvider, answerProvider) {
            this._questionProvider = questionProvider;
            this._answerProvider = answerProvider;
        }
    },

    getNextQuestion: {
        value: function() {
            this._currentQuestionIndex++;
            var self = this;
            self._currentQuestion = this._questionProvider.getQuestion(this._currentQuestionIndex);
            return self._currentQuestion;
        }
    },

    answer: {
        value: function(answer) {
            var isCorrect = answer === this._currentQuestion.answer;
            this._answerProvider.save(this._currentQuestionIndex, answer, isCorrect);
            return isCorrect;
        }
    }
});







