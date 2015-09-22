/**
 * @module ui/results.reel
 */
var Component = require("montage/ui/component").Component,
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

    percentageCorrect: {
        get: function () {
            return this._percentageCorrect;
        },
        set: function (val) {
            if (val !== this._percentageCorrect) {
                this._percentageCorrect = val;
                this.needsDraw = true;
            }
        }
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
            var statistics = Application.quizController.getStatistics();
            this.percentageCorrect = Math.round(statistics.percentageCorrect);
            this.answersCorrect = statistics.totalCorrect;
            this.percentDifference = Math.abs(Math.round(statistics.percentageDifference));
            this.elapsedTime = statistics.elapsedTime;
            this.userPercentageOfTotalTime = Math.round(statistics.elapsedTime / 60 * 100);
            this.totalQuestions = statistics.totalQuestions;
            this.elapsedTimeDifference = Math.abs(Math.round(statistics.elapsedTimeDifference));
        }
    }

});
