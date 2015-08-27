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
            if(current) {

                // check to see if current is last question if so go to the end
                if (currentIndex > this._questions.length) {
                    console.log("go to the end");
                } else {
                    // get index of current question and add 1 to move to next question
                    var currentIndex = this._questions.indexOf(current) + 1;
                    // return next question
                    return this._questions[currentIndex];
                }

            } else {
                // return first question
                return this._questions[0];
            }
        }
    },
*/

    getNext: {
        value: function() {
            var self = this;
            return new Promise(function(resolve, reject) {
            });
        }
    }

});
