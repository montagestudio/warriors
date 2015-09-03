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

    _getTotalCorrect: {
        value: function () {
            var correct = []
            this.answerProvider.answers.filter(function(answer) {
                if (answer.isCorrect) {
                    correct.push(answer);
                }
            });
            return correct.length;
        }
    },

    getPercentageCorrect: {
        value: function () {
            return  this._getTotalCorrect() / this.answerProvider.answers.length * 100;
        }
    },

    constructor: {
        value: function() {
        }
    },

    init: {
        value: function(answerProvider) {
            this.answerProvider = answerProvider;
        }
    }
});







