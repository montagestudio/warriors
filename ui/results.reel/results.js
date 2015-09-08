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

    // $question - is this the way to set values???

    percentageCorrect: {
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

    // $question - can I change the value into an absolute value inside of this property?

    timeDifference: {
        value: -2
    },

    templateDidLoad: {
        value: function () {
            var statistics = Application.quizController.getStatistics();
            this.percentageCorrect = Math.round(statistics.percentageCorrect);
            this.answersCorrect = statistics.totalCorrect;
            this.percentDifference = Math.round(statistics.percentageDifference);
            this.elapsedTime = statistics.elapsedTime;
            this.elapsedTimeDifference = statistics.elapsedTimeDifference;
        }
    }

    // $questionEnd

});
