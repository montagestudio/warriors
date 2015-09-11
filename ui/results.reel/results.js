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

    handleRestartQuizAction: {
        value: function () {
            var self = this;
            this.classList.add('transition-results-out');
            //$question - feels hacky
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
            this.totalQuestions = statistics.totalQuestions;
            this.elapsedTimeDifference = Math.abs(Math.round(statistics.elapsedTimeDifference));
        }
    }

});
