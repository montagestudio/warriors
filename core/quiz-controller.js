/**
 * @module quiz-controller
 */
var Target = require("montage/core/target").Target,
    Promise = require("montage/core/promise").Promise.Promise,
    Application = require("montage/core/application").application;
    Run = require('model/run').Run;
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

    isFinished: {
        value: null
    },

    showTimerEndedModal: {
        value: false
    },

    _runId: {
        value: null
    },

    submittedLastQuestion: {
        value: false
    },

    constructor: {
        value: function() {
            this.isFinished = false;
            this.currentQuestionIndex = -1;
            Application.addEventListener("timerHasEnded", this, false);
        }
    },

    init: {
        value: function(quizProvider, answerProvider, statsProvider, timerProvider) {
            this.quizProvider = quizProvider;
            this.quizProvider.loadData();
            this.answerProvider = answerProvider;
            this.statsProvider = statsProvider;
            this.timerProvider = timerProvider;
        }
    },

    handleTimerHasEnded: {
        value: function () {
            this.showTimerEndedModal = true;
            var self = this;

            setTimeout(function() {
                self.end();
            },500);

            setTimeout(function(){
                self.showTimerEndedModal = false;
            }, 2000);
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
                    self.timerProvider.init(2);
                    self.timerProvider.start();
                });
        }
    },

    end: {
        value: function(isFinished) {
            var self = this;
            //$question - should reset timer?
            this.timerProvider.pause();
            var run = new Run(this._runId, this.statsProvider.getTotalCorrect(), this.statsProvider.getTotalWrong(), this.timerProvider.currentTime, !!isFinished);
            return this.quizProvider.endRun(run)
                .then(function() {
                    return self.statsProvider.loadRunStatistics();
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
            var elapsedTime = this.statsProvider.getElapsedTime();
            var elapsedTimeDifference = this.statsProvider.getElapsedTimeDifference();

            return {
                percentageCorrect: percentageCorrect,
                totalCorrect: totalCorrect,
                percentageDifference: percentageDifference,
                elapsedTime: elapsedTime,
                elapsedTimeDifference: elapsedTimeDifference
            };
        }
    }
});







