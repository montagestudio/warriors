/**
 * @module stats-provider
 */
var Montage = require("montage/core/core").Montage;
/**
 * @class StatsProvider
 * @extends Montage
 */
exports.StatsProvider = Montage.specialize(/** @lends StatsProvider# */ {

    answerProvider: {
        value: null
    },

    timeController: {
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

    _getAveragePercentCorrect: {
        value: function () {
            return this._quizPercentageCorrectArray.reduce(function(sum, result){return sum + result;},0) / this._quizPercentageCorrectArray.length;
        }
    },

    getTotalCorrect: {
        value: function () {
            return this.answerProvider.answers.filter(function(answer) { return answer.isCorrect; }).length
        }
    },

    getPercentageCorrect: {
        value: function () {
            return  this.getTotalCorrect() / this.answerProvider.answers.length * 100;
        }
    },

    getPercentageDifference: {
        value: function () {
            return  this.getPercentageCorrect() - this._getAveragePercentCorrect();
        }
    },

    isPercentageHigherThanAverage: {
        value: function () {
            return this.getPercentageCorrect() > this._getAveragePercentCorrect();
        }
    },

    constructor: {
        value: function() {
        }
    },

    init: {
        value: function(answerProvider, timeController) {
            this.answerProvider = answerProvider;
            this.timeController = timeController;
        }
    }
});







