/**
 * @module ui/question.reel
 */
var Component = require("montage/ui/component").Component,
    defaultLocalizer = require("montage/core/localizer").defaultLocalizer;

/**
 * @class Question
 * @extends Component
 */
exports.Question = Component.specialize(/** @lends Question# */ {
    constructor: {
        value: function Question() {
            this.super();
        }
    },

    question: {
        set: function (value) {
            this._question = value;
        },
        get: function () {
            if (this._question && !this._localizeID) {
                var self = this;
                this._localizeID = defaultLocalizer.localize(this._question.title).then(function (message) {
                    self._question.title = message();
                    self._localizeID = null;
                }).done();
            }

            return this._question;
        }
    },

    questionTitle: {
        set: function (value) {
            this._questionTitle = value;
        },
        get: function () {
            if (!this._questionTitle && !this._localizeID) {
                var self = this;
                this._localizeID = defaultLocalizer.localize("programmatically").then(function (message) {
                    self.questionTitle = message();
                    self._localizeID = null;
                }).done();
            }

            return this._localizeID;
        }
    },

    _data: {
        value: null
    },

    data: {
        set: function (value) {
            if (value !== this._data) {
                this._data = value;
                this.needsDraw = true;
            }
        },

        get: function () {
            return this._data;
        }
    },

    enterDocument: {
        value: function (firstTime) {
            if (firstTime) {
                this.addEventListener("questionTransition", this, false);
                this.addEventListener("nextQuestion", this, false);
            }
        }
    },

    handleNextQuestion: {
        value: function () {
            console.log("handle next question");
            var self = this;
            var question = this.application.quizController.getNextQuestion();
            if (question) {
                this.data = question;
                this.classList.add("transition-in");
                this.classList.remove("transition-out");
            } else {
                setTimeout(function () {
                    self.classList.add("transition-in");
                    self.classList.remove("transition-out");
                }, 1000);

            }

        }
    },

    handleQuestionTransition: {
        value: function () {
            this.classList.add("transition-out");
            this.classList.remove("transition-in");
        }
    }
});
