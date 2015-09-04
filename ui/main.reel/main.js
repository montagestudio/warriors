/**
    @module "ui/main.reel"
    @requires montage
    @requires montage/ui/component
*/
var Component = require("montage/ui/component").Component,
PressComposer = require("montage/composer/press-composer").PressComposer,
QuizController = require("core/quiz-controller").QuizController,
AnswerProvider = require("core/answer-provider").AnswerProvider,
StatsProvider = require("core/stats-provider").StatsProvider,
QuizProvider = require("core/quiz-provider").QuizProvider;

/**
    Description TODO
    @class module:"ui/main.reel".Main
    @extends module:ui/component.Component
*/
exports.Main = Component.specialize( /** @lends module:"ui/main.reel".Main# */ {

    constructor: {
        value: function () {
            var answerProvider = new AnswerProvider();
            var quizProvider   = new QuizProvider();
            var statsProvider   = new StatsProvider();

            statsProvider.init(answerProvider);

            this.application.quizController = new QuizController();
            this.application.quizController.init(quizProvider, answerProvider, statsProvider);

        }
    },

    currentView: {
        value: 'intro'
    },

    isQuizFinished: {
        set: function (value) {
            if(value) {
                this.currentView = 'results';
            }
        }
    },

    handleStartQuizAction: {
        value: function () {
            this.currentView = "quiz";
            this.application.quizController.getNextQuestion();
        }
    }

});
