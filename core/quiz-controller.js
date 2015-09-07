/**
 * @module quiz-controller
 */
var Montage = require("montage/core/core").Montage,
    Promise = require("montage/core/promise").Promise.Promise,
    Run = require('model/run').Run;
/**
 * @class QuizController
 * @extends Montage
 */
exports.QuizController = Montage.specialize(/** @lends QuizController# */ {

    quizProvider: {
        value: null
    },

    answerProvider: {
        value: null
    },

    statsProvider: {
        value: null
    },

    currentQuestionIndex: {
        value: null
    },

    currentQuestion: {
        value: null
    },

    isFinished: {
        value: null
    },

    _runId: {
        value: null
    },

    submittedLastQuestion: {
        value: false
    },

    submitQuiz: {
        value: function () {

        }
    },

    constructor: {
        value: function() {
            this.isFinished = false;
            this.currentQuestionIndex = -1;
        }
    },

    init: {
        value: function(quizProvider, answerProvider, statsProvider) {
            this.quizProvider = quizProvider;
            this.quizProvider.loadData();
            this.answerProvider = answerProvider;
            this.statsProvider = statsProvider;
        }
    },

    getNextQuestion: {
        value: function() {
            this.currentQuestionIndex++;
            this.currentQuestion = this.quizProvider.getQuestion(this.currentQuestionIndex);

            this.submittedLastQuestion = (!this.currentQuestion || typeof this.currentQuestion !== 'object');
            if (this.submittedLastQuestion) {
                this.end(true);
            }
            return this.currentQuestion
        }
    },

    answer: {
        value: function(answer) {
            var answerIndex = this.currentQuestion.options.indexOf(answer);
            var isCorrect = answerIndex === this.currentQuestion.answer;
            this.answerProvider.save(this._runId, this.currentQuestionIndex, answerIndex, isCorrect);
            return isCorrect;
        }
    },

    start: {
        value: function() {
            var self = this;
            return this.quizProvider.startRun()
                .then(function(runId) {
                    self._runId = runId;
                    self.getNextQuestion();
                });
        }
    },

    end: {
        value: function(isFinished) {
            var self = this;
            var run = new Run(this._runId, this.statsProvider.getTotalCorrect(), this.statsProvider.getTotalWrong(), null, !!isFinished);
            return this.quizProvider.endRun(run)
                .then(function() {
                    return self.statsProvider.loadAveragePercentCorrect();
                })
                .then(function() {
                    self.isFinished = true;
                });
        }
    },

    getStatistics: {
        value: function() {
            var percentageCorrect = this.statsProvider.getPercentageCorrect();
            var totalCorrect = this.statsProvider.getTotalCorrect();
            var percentageDifference = this.statsProvider.getPercentageDifference();

            return {
                percentageCorrect: percentageCorrect,
                totalCorrect: totalCorrect,
                percentageDifference: percentageDifference
            };
        }
    }
});







