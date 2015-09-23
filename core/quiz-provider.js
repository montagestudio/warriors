/**
 * @module question-provider
 */
var Montage = require("montage/core/core").Montage,
    Quiz = require('model/quiz').Quiz,
    configuration = require('core/configuration').configuration,
    Promise = require("montage/core/promise").Promise.Promise;
/**
 * @class QuizProvider
 * @extends Montage
 */
exports.QuizProvider = Montage.specialize(/** @lends QuizProvider# */ {

    _quiz: {
        value: null
    },

    _quizId: {
        value: null
    },

    _backendService: {
        value: null
    },

    questions: {
        value: null
    },

    init: {
        value: function(quizId, backendService) {
            this._quizId = quizId;
            this._backendService = backendService;
        }
    },

    loadData: {
        value: function () {
            var self = this;
            return this._backendService.get(['quiz', this._quizId].join('/'))
                .then(function (response) {
                    if (response.status === 200) {
                        self._quiz = Quiz.load(JSON.parse(response.body));
                        self.questions = self._quiz.questions;
                    }
                });
        }
    },

    startRun: {
        value: function() {
            return this._backendService.get(['quiz', this._quizId, 'run'].join('/'))
                .then(function(response) {
                    if (response.status == 201) {
                        return response.body;
                    }
                });
        }
    },

    endRun: {
        value: function(run) {
            return this._backendService.put(['run', run.id, 'end'].join('/'), run);
        }
    },

    getTitle: {
        value: function() {
            if (this._quiz) {
                return this._quiz.title;
            }
            return null;
        }
    },

    getQuestion: {
        value: function(index) {
            if (this._quiz) {
                return this._quiz.questions[index];
            }
            return null;
        }
    },

    getQuestionsCount: {
        value: function() {
            if (this._quiz) {
                return this._quiz.questions.length;
            }
            return 0;
        }
    }
});







