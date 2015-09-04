/**
 * @module quiz-controller
 */
var Promise = require("montage/core/promise").Promise.Promise,
    Target = require("montage/core/target").Target,
    Application = require("montage/core/application").application;
/**
 * @class QuizController
 * @extends Montage
 */
exports.QuizController = Target.specialize(/** @lends QuizController# */ {

    quizProvider: {
        value: null
    },

    answerProvider: {
        value: null
    },

    statsProvider: {
        value: null
    },

    timerProvider: {
        value: null
    },

    currentQuestionIndex: {
        value: null
    },

    currentQuestion: {
        value: null
    },

    submittedLastQuestion: {
        value: false
    },

    submitQuiz: {
        value: function () {

        }
    },

    handleTimerHasEnded: {
        value: function () {
            console.log("quiz controller: timer has ended");
        }
    },

    getNextQuestion: {
        value: function() {
            this.currentQuestionIndex++;
            var self = this;
            self.currentQuestion = this.quizProvider.getQuestion(this.currentQuestionIndex);

            // check if we have submitted the last question
            if (!self.currentQuestion || typeof self.currentQuestion !== 'object') {
                this.submittedLastQuestion = true;
            }
            return self.currentQuestion
        }
    },

    answer: {
        value: function(answer) {
            var answerIndex = this.currentQuestion.options.indexOf(answer);
            var isCorrect = answerIndex === this.currentQuestion.answer;
            this.answerProvider.save(this.currentQuestionIndex, answerIndex, isCorrect);
            return isCorrect;
        }
    },

    constructor: {
        value: function() {
            this.currentQuestionIndex = -1;
            Application.addEventListener("timerHasEnded", this, false);
        }
    },

    init: {
        value: function(quizProvider, answerProvider, statsProvider, timerProvider) {
            this.quizProvider = quizProvider;
            this.answerProvider = answerProvider;
            this.statsProvider = statsProvider;
            this.timerProvider = timerProvider;
        }
    }
});







