/**
 * @module ui/question-result.reel
 */
var Component = require("montage/ui/component").Component;

/**
 * @class QuestionResult
 * @extends Component
 */
exports.QuestionResult = Component.specialize(/** @lends QuestionResult# */ {
    constructor: {
        value: function QuestionResult() {
            this.super();
        }
    },

    resultsData: {
        value: null,
    },

    totalVotes: {
        value: 200
    },

    templateDidLoad: {
        value: function () {
        }
    },

    willDraw: {
        value: function () {
            this.resultsData = this.itemData.sort(function(a,b){
                return b.votes - a.votes;
            });
            this.resultsData = this.resultsData.slice(0,3);

            var extensions = ["st","nd","rd"];

            for(i = 0; i < this.resultsData.length; i++) {
                this.resultsData[i].percentage = (this.resultsData[i].votes / this.totalVotes) * 100 + "%";
                this.resultsData[i].place = i + 1 + extensions[i];
            }
        }
    },

    handleVoteAgainAction: {
        value: function () {
            this.application.navigationController.selectView('voting');
        }
    },



});
