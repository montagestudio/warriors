var Montage = require("montage/core/core").Montage,
    Application = require("montage/core/application").application,
    Promise = require("montage/core/promise").Promise.Promise;
/**
 * @class StatsController
 * @extends Montage
 */
exports.StatsController = Montage.specialize(/** @lends StatsController# */ {

    _answerProvider: {
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
            this._answerProvider = answerProvider;
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

    getStatistics: {
        value: function() {
            return {
                percentageCorrect: this.getPercentageCorrect(),
                totalCorrect: this.getTotalCorrect(),
                elapsedTime: this.getElapsedTime(),
                averagePercentCorrect: this.getAveragePercentCorrect(),
                averageTimeElapsed: this.getAverageElapsedTime(),
                totalQuestions: this.quizProvider.getQuestionsCount()
            };
        }
    },

    getTotal: {
        value: function() {
            return this._answerProvider.answers.length;
        }
    },

    getTotalCorrect: {
        value: function () {
            if (this._answerProvider.answers.length > 0) {
                return this._answerProvider.answers.filter(function(answer) { return answer.isCorrect; }).length;
            } else {
                return 0;
            }
        }
    },

    getTotalWrong: {
        value: function () {
            if (this._answerProvider.answers.length > 0) {
                return this._answerProvider.answers.filter(function(answer) { return !answer.isCorrect; }).length;
            } else {
                return -1;
            }
        }
    },

    getPercentageCorrect: {
        value: function () {
            return this.getTotalCorrect() / this.quizProvider.questions.length * 100;
        }
    },

    getElapsedTime: {
        value: function () {
            return this.timerProvider.quizTime - this.timerProvider.currentTime;
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

    getAveragePercentCorrect: {
        value: function () {
            return this._getAverageOfArray(this._quizPercentageCorrectArray);
        }
    },

    getAverageElapsedTime: {
        value: function () {
            return Math.round(this._getAverageOfArray(this._quizElapsedTimeArray)*100)/100;
        }
    }

});
