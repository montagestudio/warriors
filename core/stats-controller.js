var Montage = require("montage/core/core").Montage,
    Application = require("montage/core/application").application,
    Promise = require("montage/core/promise").Promise.Promise;
/**
 * @class StatsController
 * @extends Montage
 */
exports.StatsController = Montage.specialize(/** @lends StatsController# */ {
    _questions: {
        value: null
    },

    _answerProvider: {
        value: null
    },

    _statsProvider: {
        value: null
    },

    _quizProvider: {
        value: null
    },

    _quizId: {
        value: null
    },

    _backendService: {
        value: null
    },

    timerProvider: {
        value: null
    },

    _quizPercentageCorrectArray: {
        value: null
    },

    _quizElapsedTimeArray: {
        value: null
    },

    _getAverageOfArray: {
        value: function (arr) {
            if(arr) {
                return arr.reduce(function(sum, result){ return sum + result; }, 0) / arr.length;
            }
            return 0;
        }
    },

    _getQuizElapsedTimeArray: {
        set: function(value) {
            if(value) {
                return this._quizElapsedTimeArray = value;
            } else {
                return null;
            }
        },

        get: function (){
            return this._quizElapsedTimeArray;
        }
    },

    getPercentageCorrect: {
        value: function () {
            return this._answerProvider.getTotalCorrect() / this._questions.length * 100;
        }
    },

    getAveragePercentCorrect: {
        value: function () {
            return this._getAverageOfArray(this._statsProvider.quizPercentageCorrectArray);
        }
    },

    getAverageElapsedTime: {
        value: function () {
            return Math.round(this._getAverageOfArray(this._statsProvider.quizElapsedTimeArray)*100)/100;
        }
    },

    constructor: {
        value: function() {
        }
    },

    // $question - questions returns null here...what do we do?

    init: {
        value: function(statsProvider, questions, answerProvider, timerProvider) {
            this._statsProvider = statsProvider;
            this._answerProvider = answerProvider;
            this._timerProvider = timerProvider;
            this._questions = questions;
            // this._quizId = quizId;
            // this._backendService = backendService;
            console.log(this._answerProvider);
        }
    },

    // $question - if this object is made public...then everything else is private?

    getStatistics: {
        value: function() {
            this._statsProvider.loadRunStatistics();

            return {
                percentageCorrect: this.getPercentageCorrect(),
                totalCorrect: this._answerProvider.getTotalCorrect(),
                elapsedTime: this._timerProvider.getElapsedTime(),
                averagePercentCorrect: this.getAveragePercentCorrect(),
                averageTimeElapsed: this.getAverageElapsedTime(),
                totalQuestions: this._quizProvider.getQuestionsCount()
            };
        }
    }

});
