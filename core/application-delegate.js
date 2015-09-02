var Montage = require("montage/core/core").Montage,
QuizController = require("core/quiz-controller").QuizController,
AnswerProvider = require("core/answer-provider").AnswerProvider,
QuizProvider = require("core/quiz-provider").QuizProvider;

exports.ApplicationDelegate = Montage.specialize({

    willFinishLoading: {
        value: function (app) {

            var answerProvider = new AnswerProvider();
            var quizProvider   = new QuizProvider();

            app.quizController = new QuizController();
            app.quizController.init(quizProvider, answerProvider);

            app.currentView = "intro";

        }
    }
});
