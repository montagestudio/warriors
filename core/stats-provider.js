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

    // $question - where is this information coming from?

    _quizPercentageCorrectArray: {
        value: [40,50,20,90,100,30]
    },

    _getAveragePercentCorrect: {
        value: function () {
            return this._quizPercentageCorrectArray.reduce(function(sum, result){ return sum + result;},0) / this._quizPercentageCorrectArray.length;
        }
    },

    _getTotalCorrect: {
        value: function () {
            return this.answerProvider.answers.filter(function(answer) { return answer.isCorrect; }).length
        }
    },

    getPercentageCorrect: {
        value: function () {
            return  this._getTotalCorrect() / this.answerProvider.answers.length * 100;
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







