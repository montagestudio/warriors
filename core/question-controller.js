/**
 * @module question-controller
 */
var Montage = require("montage/core/core").Montage,
    Promise = require("montage/core/promise").Promise.Promise;
/**
 * @class QuestionController
 * @extends Montage
 */
exports.QuestionController = Montage.specialize(/** @lends QuestionController# */ {
    _questions: {
        value: []
    },

    getNext: {
        value: function(current) {
        }
    }

});
