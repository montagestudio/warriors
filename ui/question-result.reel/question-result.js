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

    data: {
        value: null,
    },

    templateDidLoad: {
        value: function () {
            console.log("results");
            this.data = [
                {
                    name: "Leandro Barbosa",
                    place: "1st",
                    percentage: "25%"
                },{
                    name: "Harrison Barnes",
                    place: "2nd",
                    percentage: "15%"
                },{
                    name: "James Michael McAdoo",
                    place: "4th",
                    percentage: "5%"
                }
            ];
        }
    },

    handleVoteAgainAction: {
        value: function () {
            this.application.navigationController.selectView('voting');
        }
    },

    willDraw: {
        value: function () {
            console.log(this.itemData);
        }
    }



});
