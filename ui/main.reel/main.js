/**
 @module "ui/main.reel"
 @requires montage
 @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component,
    PressComposer = require("montage/composer/press-composer").PressComposer,
    QuizController = require("core/quiz-controller").QuizController,
    AnswerProvider = require("core/answer-provider").AnswerProvider,
    StatsController = require("core/stats-controller").StatsController,
    StatsProvider = require("core/stats-provider").StatsProvider,
    TimerProvider = require("core/timer-provider").TimerProvider,
    QuizProvider = require("core/quiz-provider").QuizProvider,
    BackendService = require("core/backend-service").BackendService,
    Application = require("montage/core/application").application,
    configuration = require('core/configuration').configuration;

/**
 Description TODO
 @class module:"ui/main.reel".Main
 @extends module:ui/component.Component
 */
exports.Main = Component.specialize(/** @lends module:"ui/main.reel".Main# */ {

    constructor: {
        value: function () {
            var backendService = new BackendService();
            var answerProvider = new AnswerProvider();
            var timerProvider = new TimerProvider();
            var quizProvider = new QuizProvider();
            var statsProvider = new StatsProvider();

            backendService.init(configuration.backendUrl);
            answerProvider.init(backendService);
            quizProvider.init(configuration.quizId, backendService);
            statsProvider.init(configuration.quizId, backendService);

            Application.quizController = new QuizController();
            Application.quizController.init(quizProvider, answerProvider, timerProvider);

            Application.statsController = new StatsController();
            Application.statsController.init(statsProvider, quizProvider, answerProvider, timerProvider);
        }
    },

    currentView: {
        value: 'intro'
    },

    isQuizFinished: {
        set: function (value) {
            if (value && !this.timerEnded) {
                this.bodyContent.switchToView('results');
            }
        }
    },

    handleReviewButtonAction: {
        value: function () {
            this.menu.toggleMenu();
        }
    },

    handleStartQuizAction: {
        value: function () {
            var self = this;
            // // When running this in WeChat, the action seems always be trigger 2 twice. Add juge in related places to
            // // prevent duplicate events dispatch.
            if (!this._startQuizAction) {
                this._startQuizAction = true;
                this.bodyContent.switchToView('quiz', function() {
                    Application.quizController.start(configuration.quizTime);
                    self._startQuizAction = false;
                })
            }

        }
    },

    // $fix - should be reworked to not use timeout

    handleRestartQuizAction: {
        value: function () {
            var self = this;
            if (!this._isRestarting) {
                this._isRestarting = true;
                Application.quizController.reset();
                this.bodyContent.switchToView('quiz', function() {
                    Application.quizController.start(configuration.quizTime);
                    self._isRestarting = false;
                })
            }
        }
    },

    _timerEnded: {
        value: false
    },

    timerEnded: {
        get: function () {
            return this._timerEnded;
        },
        set: function (value) {
            var self = this;
            this._timerEnded = value;
            if (value) {
                this.bodyContent.switchToView('timerEnded', function() {
                    self.bodyContent.switchToView('results');
                });
            }
        }
    },

    // $fix - should be reworked to not use timeout

    handleBrowsePlayersAction: {
        value: function () {
            this.bodyContent.switchToView('browse');
        }
    },

    handleViewResultsAction: {
        value: function () {
            this.bodyContent.switchToView('results');
        }
    }

});
