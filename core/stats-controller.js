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

    _quizProvider: {
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

    _getPercentageCorrect: {
        value: function () {
            return this._answerProvider.getTotalCorrect() / this._questions.length * 100;
        }
    },

    _getAveragePercentageCorrect: {
        value: function () {
            return this._getAverageOfArray(this._statsProvider.quizPercentageCorrectArray);
        }
    },

    _getAverageElapsedTime: {
        value: function () {
            return this._getAverageOfArray(this._statsProvider.quizElapsedTimeArray);
        }
    },

    _convertToPercentage: {
        value: function (a,b) {
            return b / a * 100;
        }
    },

    _getUserPercentageOfTotalTime: {
        value: function () {
            return this._convertToPercentage(this._timerProvider.quizTime,this._timerProvider.getElapsedTime());
        }
    },

    _getAveragePercentageOfTotalTime: {
        value: function () {
            return this._convertToPercentage(this._timerProvider.quizTime, this._getAverageElapsedTime());
        }
    },

    constructor: {
        value: function() {
        }
    },

    init: {
        value: function(statsProvider, quizProvider, answerProvider, timerProvider) {
            this._statsProvider = statsProvider;
            this._answerProvider = answerProvider;
            this._timerProvider = timerProvider;
            this._quizProvider = quizProvider;
            this._statsProvider.loadRunStatistics();
        }
    },

    getStatistics: {
        value: function() {
            this._questions = this._quizProvider.questions;
            this._statsProvider.loadRunStatistics();

            return {
                percentageCorrect: this._getPercentageCorrect(),
                totalCorrect: this._answerProvider.getTotalCorrect(),
                elapsedTime: this._timerProvider.getElapsedTime(),
                averagePercentageCorrect: this._getAveragePercentageCorrect(),
                averageTimeElapsed: this._getAverageElapsedTime(),
                totalQuestions: this._quizProvider.getQuestionsCount(),
                userPercentageOfTotalTime: this._getUserPercentageOfTotalTime(),
                averagePercentageOfTotalTime: this._getAveragePercentageOfTotalTime()
            };
        }
    }

});
