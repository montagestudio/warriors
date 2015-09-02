var Promise = require("montage/core/promise").Promise.Promise,
    QuizController = require("core/quiz-controller").QuizController;

describe('test/quiz-controller-spec', function() {
    var done,
        questionProviderMock,
        answerProviderMock;
    beforeEach(function() {
        done = false;
        questionProviderMock = {
            getQuestion: function() {}
        };
        answerProviderMock = {
            save: function() {}
        };
    });
    describe('When getting next question', function() {

        describe('with a current question', function() {
            it('should return next question', function() {
                var passedIndex,
                    newQuestion,
                    quizController = new QuizController();
                questionProviderMock.getQuestion = function(index) {
                    passedIndex = index;
                    return 'BAR';
                };
                quizController.init(questionProviderMock, answerProviderMock);
                quizController._currentQuestionIndex = 0;

                newQuestion = quizController.getNextQuestion();

                expect(passedIndex).toBeDefined();
                expect(passedIndex).toEqual(1);
                expect(newQuestion).toBeDefined();
                expect(newQuestion).toEqual('BAR');
            });

            describe('cannot get next question', function() {
                it('should return null', function() {
                    var newQuestion,
                        quizController = new QuizController();
                    questionProviderMock.getQuestion = function() {
                        return null;
                    };
                    quizController.init(questionProviderMock, answerProviderMock);
                    quizController._currentQuestionIndex = 0;

                    newQuestion = quizController.getNextQuestion();

                    expect(newQuestion).toBeNull();
                });
            });
        });

        describe('with no current question', function() {
            it('should return first question', function() {
                var passedIndex,
                    newQuestion,
                    quizController = new QuizController();
                questionProviderMock.getQuestion = function(index) {
                    passedIndex = index;
                    return Promise.resolve('FOO');
                };
                quizController.init(questionProviderMock, answerProviderMock);

                runs(function() {
                    quizController.getNextQuestion()
                        .then(function(question) {
                            newQuestion = question;
                        })
                        .finally(function() {
                            done = true;
                        });
                });

                waitsFor(function() {
                    return done;
                });

                runs(function() {
                    expect(passedIndex).toBeDefined();
                    expect(passedIndex).toEqual(0);
                    expect(newQuestion).toBeDefined();
                    expect(newQuestion).toEqual('FOO');
                });
            })
        })
    });
    describe('When answering question', function() {
        describe('correctly', function() {
            it('should return that answer is true', function() {
                var isCorrect,
                    currentQuestion = { options:['FOO','BAR'], answer: 1 },
                    quizController = new QuizController();
                quizController.init(questionProviderMock, answerProviderMock);
                quizController._currentQuestion = currentQuestion;

                isCorrect = quizController.answer(currentQuestion.options[1]);

                expect(isCorrect).toBeDefined();
                expect(isCorrect).toEqual(true);
            });
        });

        describe('incorrectly', function() {
            it('should return that answer is false', function() {
                var isCorrect,
                    currentQuestion = { options:['FOO','BAR'], answer: 1 },
                    quizController = new QuizController();
                quizController.init(questionProviderMock, answerProviderMock);
                quizController._currentQuestion = currentQuestion;

                isCorrect = quizController.answer(currentQuestion.options[0]);

                expect(isCorrect).toBeDefined();
                expect(isCorrect).toEqual(false);
            });
        });

        it('should store answer and correctness', function() {
            var questionAnswered,
                givenAnswer,
                isCorrect,
                currentQuestion = { options:['FOO','BAR'], answer: 1 },
                quizController = new QuizController();
            answerProviderMock.save = function(questionIndex, answer, correctness) {
                questionAnswered = questionIndex;
                givenAnswer = answer;
                isCorrect = correctness;
            };
            quizController.init(questionProviderMock, answerProviderMock);
            quizController._currentQuestionIndex = 42;
            quizController._currentQuestion = currentQuestion;

            isCorrect = quizController.answer(currentQuestion.options[1]);

            expect(questionAnswered).toBeDefined();
            expect(questionAnswered).toEqual(42);
            expect(givenAnswer).toBeDefined();
            expect(givenAnswer).toEqual('BAR');
            expect(isCorrect).toBeDefined();
            expect(isCorrect).toEqual(true);
        });
    });
});
