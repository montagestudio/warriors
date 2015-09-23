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
        value: function(quizProvider, quizId, answerProvider, timerProvider, backendService) {
            this._quizId = quizId;
            this.answerProvider = answerProvider;
            this.timerProvider = timerProvider;
            this.quizProvider = quizProvider;
            this._backendService = backendService;
        }
    },

    loadRunStatistics: {
        value: function() {
            var self = this;
            return this._backendService.get(['quiz', this._quizId, 'stats'].join('/'))
                .then(function(response) {
                    if (response.status == 200) {
                        var statistics = JSON.parse(response.body);
                        self._quizPercentageCorrectArray = statistics.map(function(x) { return x.score; });
                        self._quizElapsedTimeArray = statistics.map(function(x) { return x.duration; });
                    } else if (response.status == 204) {
                        self._quizPercentageCorrectArray = [];
                        self._quizElapsedTimeArray = [];
                    }
                });
        }
    },

    _getAverageOfArray: {
        value: function (arr) {
            if(arr) {
                return arr.reduce(function(sum, result){ return sum + result; }, 0) / arr.length;
            }
            return 0;
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
            if (this.answerProvider.answers.length > 0) {
                return this.answerProvider.answers.filter(function(answer) { return answer.isCorrect; }).length;
            } else {
                return 0;
            }
        }
    },

    getTotalWrong: {
        value: function () {
            if (this.answerProvider.answers.length > 0) {
                return this.answerProvider.answers.filter(function(answer) { return !answer.isCorrect; }).length;
            } else {
                return -1;
            }
        }
    },

    getPercentageCorrect: {
        value: function () {
            return this.getTotalCorrect() / this.quizProvider.getQuestionsCount() * 100;
        }
    },

    getPercentageDifference: {
        value: function () {
            return this.getPercentageCorrect() - this._getAveragePercentCorrect();
        }
    },

    getElapsedTime: {
        value: function () {
            return this.timerProvider.quizTime - this.timerProvider.currentTime;
        }
    },

    _getAverageElapsedTime: {
        value: function () {
            return Math.round(this._getAverageOfArray(this._quizElapsedTimeArray)*100)/100;
        }
    },

    getElapsedTimeDifference: {
        value: function () {
            return this.timerProvider.currentTime - this._getAverageElapsedTime();
        }
    }

});







