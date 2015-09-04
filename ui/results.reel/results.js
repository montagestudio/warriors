/**
 * @module ui/results.reel
 */
var Component = require("montage/ui/component").Component;

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

    totalTime: {
        value: 59
    },

    percentDifference: {
        value: 15
    },

    // $question - can I change the value into an absolute value inside of this property?

    timeDifference: {
        value: -2
    },

    templateDidLoad: {
        value: function () {
            this.percentageCorrect = this.application.quizController.statsProvider.getPercentageCorrect().toFixed(1);
            this.answersCorrect = this.application.quizController.statsProvider.getTotalCorrect();
        }
    }

    // $questionEnd

});
