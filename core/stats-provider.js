/**
 * @module stats-provider
 */
var Montage = require("montage/core/core").Montage,
    Promise = require("montage/core/promise").Promise.Promise;
/**
 * @class StatsProvider
 * @extends Montage
 */
exports.StatsProvider = Montage.specialize(/** @lends StatsProvider# */ {

    answerProvider: {
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

    // $question - is this how we check for an empty array? can't this be done in one method?

    _quizPercentageCorrectArray: {
        value: null
    },

    _getQuizPercentageCorrectArray: {
        set: function(value) {
            if(value) {
                return this._quizPercentageCorrectArray = value;
            } else {
                return null;
            }
        }
    },

    // $questionEnd

    _quizElapsedTimeArray: {
        value: [60,45,30,20]
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

    constructor: {
        value: function() {
        }
    },

    init: {
        value: function(quizId, answerProvider, timerProvider, backendService) {
            this._quizId = quizId;
            this.answerProvider = answerProvider;
            this.timerProvider = timerProvider;
            this._backendService = backendService;
        }
    },

    loadAveragePercentCorrect: {
        value: function() {
            var self = this;
            return this._backendService.get(['quiz', this._quizId, 'stats'].join('/'))
                .then(function(response) {
                    if (response.status == 200) {
                        self._getQuizPercentageCorrectArray = JSON.parse(response.body);
                    } else if (response.status == 204) {
                        self._getQuizPercentageCorrectArray = [];
                    }
                });
        }
    },

    _getAverageOfArray: {
        value: function (arr) {
            return arr.reduce(function(sum, result){ return sum + result; }, 0) / arr.length;
        }
    },

    _getAveragePercentCorrect: {
        value: function () {
            return this._getAverageOfArray(this._quizPercentageCorrectArray);
        }
    },

    getTotal: {
        value: function() {
            return this.answerProvider.answers.length;
        }
    },

    getTotalCorrect: {
        value: function () {
            return this.answerProvider.answers.filter(function(answer) { return answer.isCorrect; }).length;
        }
    },

    getTotalWrong: {
        value: function () {
            return this.answerProvider.answers.filter(function(answer) { return !answer.isCorrect; }).length;
        }
    },

    getPercentageCorrect: {
        value: function () {
            return this.getTotalCorrect() / this.answerProvider.answers.length * 100;
        }
    },

    getPercentageDifference: {
        value: function () {
            return this.getPercentageCorrect() - this._getAveragePercentCorrect();
        }
    },

    isPercentageHigherThanAverage: {
        value: function () {
            return this.getPercentageCorrect() > this._getAveragePercentCorrect();
        }
    },

    getElapsedTime: {
        value: function () {
            return this.timerProvider.quizTime - this.timerProvider.currentTime;
        }
    },

    _getAverageElapsedTime: {
        value: function () {
            return this._getAverageOfArray(this._quizElapsedTimeArray);
        }
    },

    getElapsedTimeDifference: {
        value: function () {
            return this.timerProvider.currentTime - this._getAverageElapsedTime();
        }
    }
});







