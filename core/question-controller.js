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

    _currentIndex: {
        value: null
    },

    constructor: {
        value: function() {
            this._questions = questions;
            this._currentIndex = -1;
        }
    },

    getNext: {
        value: function() {

            var question, atLastQuestion;

            this._currentIndex++;

            if (this._currentIndex >= this._questions.length) {
                this._currentIndex--;
                atLastQuestion = true;
            } else {
                question = this._questions[this._currentIndex];
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







