/**
 * @module ui/results.reel
 */
var Component = require("montage/ui/component").Component,
    configuration = require('core/configuration').configuration,
    Application = require("montage/core/application").application;

/**
 * @class Results
 * @extends Component
 */
exports.Results = Component.specialize(/** @lends Results# */ {
    constructor: {
        value: function Results() {
            this.super();
        }
    },

    _percentageCorrect: {
        value: null
    },

    answersCorrect: {
        value: null
    },

    elapsedTime: {
        value: null
    },

    percentDifference: {
        value: null
    },

    timeDifference: {
        value: null
    },

    totalQuestions: {
        value: null
    },

    userPercentageOfTotalTime: {
        value: null
    },

    handleRestartQuizAction: {
        value: function () {
            var self = this;
            this.classList.add('transition-results-out');

            setTimeout(function() {
                self.classList.remove('transition-results-out');
            }, 1000)
        }
    },

    enterDocument: {
        value: function () {
            var statistics = Application.statsController.getStatistics();
            this.percentageCorrect = Math.round(statistics.percentageCorrect);
            this.answersCorrect = statistics.totalCorrect;
            this.elapsedTime = statistics.elapsedTime;
            this.averagePercentageCorrect = Math.round(statistics.averagePercentageCorrect);
            this.averageTimeElapsed = Math.round(statistics.averageTimeElapsed);
            this.totalQuestions = statistics.totalQuestions;
            this.userPercentageOfTotalTime = Math.round(statistics.userPercentageOfTotalTime);
            this.averagePercentageOfTotalTime = Math.round(statistics.averagePercentageOfTotalTime);
        }
    }

});
