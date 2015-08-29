/**
 * @module question-controller
 */
var Montage = require("montage/core/core").Montage,
    Promise = require("montage/core/promise").Promise.Promise,
    questions = require("../../assets/questions.json");
/**
 * @class QuestionController
 * @extends Montage
 */
exports.QuestionController = Montage.specialize(/** @lends QuestionController# */ {

    _questions: {
        value: null
    },

    constructor: {
        value: function() {
            this._questions = questions;
        }
    },

    getQuestion: {
        value: function(index) {

            var question, atLastQuestion;


            if (index >= this._questions.length) {
                atLastQuestion = true;
            } else {
                question = this._questions[index];
            }

            return new Promise(function(resolve, reject) {
                if (atLastQuestion) {
                    reject();
                } else {
                    resolve(question);
                }
            });
        }
    }
});







