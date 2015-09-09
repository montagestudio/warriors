/**
 * @module answer-provider
 */
var Montage = require("montage/core/core").Montage,
    Answer = require('model/answer').Answer;
/**
 * @class AnswerProvider
 * @extends Montage
 */
exports.AnswerProvider = Montage.specialize(/** @lends AnswerProvider# */ {

    answers: {
        value: null
    },

    _backendService: {
        value: null
    },

    constructor: {
        value: function() {
            this.answers = [];
        }
    },

    init:{
        value: function(backendService) {
            this._backendService = backendService;
        }
    },

    save: {
        value: function(runId, index, answer, isCorrect) {
            var answerData = new Answer(runId, index, answer, isCorrect);
            this.answers.push(answerData);
            this._recordAnswer(answerData);
        }
    },

    reset: {
        value: function() {
            this.answers = [];
        }
    },

    _recordAnswer: {
        value: function(answer) {
            return this._backendService.post(['run', answer.runId, 'answer'].join('/'), answer);
        }
    }
});







