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

    totalQuestions: {
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

    _startTime: {
        value: null
    },

    questions: {
        value: null
    },

    answers: {
        value: null
    },

    totalQuestions: {
        value: null
    },

    constructor: {
        value: function() {
            this.isFinished = false;
            this.currentQuestionIndex = -1;
            Application.addEventListener("timerHasEnded", this, false);
        }
    },

    init: {
        value: function(quizProvider, answerProvider, timerProvider) {
            this.quizProvider = quizProvider;
            this.quizProvider.loadData();
            this.answerProvider = answerProvider;
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
            this.currentQuestion = this.quizProvider.getQuestion(this.currentQuestionIndex + 1);

            this.submittedLastQuestion = (!this.currentQuestion || typeof this.currentQuestion !== 'object');
            if (this.submittedLastQuestion) {
                this.end(true);
            } else {
                this.currentQuestionIndex++;
                this.timerProvider.resume();
            }
            return this.currentQuestion
        }
    },

    answer: {
        value: function(answer) {
            this.timerProvider.pause();
            var answerIndex = this.currentQuestion.options.indexOf(answer);
            var isCorrect = answerIndex === this.currentQuestion.answer;
            this.answerProvider.save(this._runId, this.currentQuestionIndex, answerIndex, isCorrect);
            return isCorrect;
        }
    },

    start: {
        value: function(time) {
            if(time) {
                this._startTime = time;
            }
            var self = this;

            return this.quizProvider.startRun()
                .then(function(runId) {
                    self._runId = runId;
                    self.getNextQuestion();
                    self.totalQuestions = self.quizProvider.getQuestionsCount();
                    self.timerProvider.start(self._startTime);
                    self.questions = self.quizProvider.questions;
                }).catch(function(e) {
                    console.log(e);
                });
        }
    },

    end: {
        value: function(isFinished) {
            var self = this;
            this.timerProvider.pause();
            this.isFinished = true;
            this.answers = this.answerProvider.answers;

            var totalWrong = this.quizProvider.getQuestionsCount() - this.answerProvider.getTotalCorrect();
            var run = new Run(this._runId, this.answerProvider.getTotalCorrect(), totalWrong, this.timerProvider.currentTime, !!isFinished);
            return this.quizProvider.endRun(run);
        }
    },

    reset: {
        value: function() {
            this._runId = null;
            this.isFinished = false;
            this.submittedLastQuestion = null;
            this.currentQuestion = null;
            this.currentQuestionIndex = -1;
            this.answerProvider.reset();
        }
    }
});







