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

/*
    getNext: {
        value: function() {
            // check to see if there is a current question if not return first question
            if(!this._currentIndex && this._currentIndex !== 0) {
                this._currentIndex = 0;
                return this._questions[this._currentIndex];

            // check to see if current is last question if so go to the end
            } else {
                this._currentIndex++;
                if(this._currentIndex >= this._questions.length) {
                    console.log("that was the last question");
                } else {
                    return this._questions[this._currentIndex];
                }

            }
        }
    },
*/

    getNext: {
        value: function() {
            // var self = this;
            var question, atLastQuestion;

            if(!this._currentIndex && this._currentIndex !== 0) {
                this._currentIndex = 0;
                question = this._questions[this._currentIndex];
            } else {
                this._currentIndex++;
                if (this._currentIndex >= this._questions.length) {
                    atLastQuestion = true;
                } else {
                    question = this._questions[this._currentIndex];
                }
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







