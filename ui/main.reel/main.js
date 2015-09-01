/**
    @module "ui/main.reel"
    @requires montage
    @requires montage/ui/component
*/
var Component = require("montage/ui/component").Component,
PressComposer = require("montage/composer/press-composer").PressComposer,
QuizController = require("core/quiz-controller").QuizController,
QuizProvider = require("core/quiz-provider").QuizProvider,
NavigationController = require("core/navigation-controller").NavigationController;

/**
    Description TODO
    @class module:"ui/main.reel".Main
    @extends module:ui/component.Component
*/
exports.Main = Component.specialize( /** @lends module:"ui/main.reel".Main# */ {

    enterDocument: {
        value: function Main(firstTime) {
            if(firstTime) {
                this.application.navigationController = NavigationController;
                var quizProvider = new QuizProvider();
                this.application.QuizController = new QuizController();
                this.application.QuizController.init(quizProvider);
            }
        }
    },

    handleStartQuizAction: {
        value: function () {
            this.application.navigationController.selectView('quiz');

            this.application.QuizController.getNextQuestion();
        }
    }

});
