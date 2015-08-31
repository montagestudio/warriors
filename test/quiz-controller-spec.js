var Promise = require("montage/core/promise").Promise.Promise,
    QuizController = require("core/quiz-controller").QuizController;

describe('test/quiz-controller-spec', function() {
    var done,
        questionControllerMock,
        answerControllerMock;
    beforeEach(function() {
        done = false;
        questionControllerMock = {};
        answerControllerMock = {};
    });
    describe('When getting next question', function() {

        describe('with a current question', function() {
            it('should return next question', function() {
                var passedIndex,
                    newQuestion,
                    quizController = new QuizController(questionControllerMock);
                questionControllerMock.getQuestion = function(index) {
                    passedIndex = index;
                    return Promise.resolve('BAR');
                };
                quizController._currentQuestionIndex = 0;

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
                    expect(passedIndex).toEqual(1);
                    expect(newQuestion).toBeDefined();
                    expect(newQuestion).toEqual('BAR');
                });
            });

            describe('cannot get next question', function() {
                it('should reject promise', function() {
                    var rejected,
                        quizController = new QuizController(questionControllerMock);
                    questionControllerMock.getQuestion = function() {
                        return Promise.reject();
                    };
                    quizController._currentQuestionIndex = 0;

                    runs(function() {
                        quizController.getNextQuestion()
                            .then(function() {
                                rejected = false;
                            }, function() {
                                rejected = true;
                            })
                            .finally(function() {
                                done = true;
                            });
                    });

                    waitsFor(function() {
                        return done;
                    });

                    runs(function() {
                        expect(rejected).toBeDefined();
                        expect(rejected).toBe(true);
                    });
                });
            });
        });

        describe('with no current question', function() {
            it('should return first question', function() {
                var passedIndex,
                    newQuestion,
                    quizController = new QuizController(questionControllerMock);
                questionControllerMock.getQuestion = function(index) {
                    passedIndex = index;
                    return Promise.resolve('FOO');
                };

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
                    currentQuestion = { answer: 1 },
                    quizController = new QuizController();
                quizController._currentQuestion = currentQuestion;

                isCorrect = quizController.answer(1);

                expect(isCorrect).toBeDefined();
                expect(isCorrect).toEqual(true);
            });
        });

        describe('incorrectly', function() {
            it('should return that answer is false', function() {
                var isCorrect,
                    currentQuestion = { answer: 1 },
                    quizController = new QuizController();
                quizController._currentQuestion = currentQuestion;

                isCorrect = quizController.answer(0);

                expect(isCorrect).toBeDefined();
                expect(isCorrect).toEqual(false);
            });
        });

        it('should store answer and correctness', function() {
            var questionAnswered,
                givenAnswer,
                isCorrect,
                currentQuestion = { answer: 1 },
                quizController = new QuizController(null, answerControllerMock);
            answerControllerMock.recordAnswer = function(questionIndex, answer, correctness) {
                questionAnswered = questionIndex;
                givenAnswer = answer;
                isCorrect = correctness;
            };
            quizController._currentQuestionIndex = 42;
            quizController._currentQuestion = currentQuestion;

            isCorrect = quizController.answer(1);

            expect(questionAnswered).toBeDefined();
            expect(questionAnswered).toEqual(42);
            expect(givenAnswer).toBeDefined();
            expect(givenAnswer).toEqual(1);
            expect(isCorrect).toBeDefined();
            expect(isCorrect).toEqual(true);
        });
    });
});
