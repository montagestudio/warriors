/**
    @module "ui/main.reel"
    @requires montage
    @requires montage/ui/component
*/
var Component = require("montage/ui/component").Component,
PressComposer = require("montage/composer/press-composer").PressComposer;

/**
    Description TODO
    @class module:"ui/main.reel".Main
    @extends module:ui/component.Component
*/
exports.Main = Component.specialize( /** @lends module:"ui/main.reel".Main# */ {

    enterDocument: {
        value: function Main(firstTime) {
            if(firstTime) {

            }
        }
    },

    handleStartQuizAction: {
        value: function () {
            this.view.switchValue = "quiz";
            this.application.quizController.getNextQuestion();
        }
    }

});
