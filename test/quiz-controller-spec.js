var Promise = require("montage/core/promise").Promise.Promise,
    QuizController = require("core/quiz-controller").QuizController;

describe('test/quiz-controller-spec', function() {
    var done,
        quizProviderMock,
        answerProviderMock,
        statsProviderMock,
        timerProviderMock;
    beforeEach(function() {
        done = false;
        quizProviderMock = {
            loadData: function() {},
            getQuestion: function() { return {}; },
            getQuestionsCount: function() {},
            startRun: function() {},
            endRun: function() {}
        };
        answerProviderMock = {
            getTotalCorrect: function() {},
            getTotalWrong: function() {},
            save: function() {},
            reset: function() {}
        };
        statsProviderMock = {
            loadRunStatistics: function() {},
            getPercentageCorrect: function() {},
            getPercentageDifference: function() {},
            getElapsedTime: function() {},
            getElapsedTimeDifference: function() {}
        };
        timerProviderMock = {
            start: function() {},
            pause: function() {},
            resume: function() {}
        };
    });
    describe('When starting the quiz', function() {
        it('should store run id', function() {
            var quizController = new QuizController();
            quizProviderMock.startRun = function() {
                return Promise.resolve('FOO');
            };
            quizController.init(quizProviderMock, answerProviderMock, timerProviderMock);

            runs(function() {
                quizController.start()
                    .then(function() {
                        done = true;
                    }, function(error) {
                        console.log(error);
                    });
            });

            waitsFor(function() {
                return done;
            });

            runs(function() {
                expect(quizController._runId).toBeDefined();
                expect(quizController._runId).toEqual('FOO')
            });
        });

        it('should get the run id from the provider', function() {
            var providerCalled = false,
                quizController = new QuizController();
            quizProviderMock.startRun = function() {
                providerCalled = true;
                return Promise.resolve('FOO');
            };
            quizController.init(quizProviderMock, answerProviderMock, timerProviderMock);

            runs(function() {
                quizController.start()
                    .then(function() {
                        done = true;
                    });
            });

            waitsFor(function() {
                return done;
            });

            runs(function() {
                expect(providerCalled).toEqual(true)
            });
        });

        it('should load first question', function() {
            var quizController = new QuizController();
            quizProviderMock.startRun = function() {
                return Promise.resolve();
            };
            quizProviderMock.getQuestion = function() {
                return { title: 'BAR' };
            };

            quizController.init(quizProviderMock, answerProviderMock, timerProviderMock);

            runs(function() {
                quizController.start()
                    .then(function() {
                        done = true;
                    });
            });

            waitsFor(function() {
                return done;
            });

            runs(function() {
                expect(quizController.currentQuestion).toBeDefined();
                expect(quizController.currentQuestion.title).toEqual('BAR')
            });
        });
    });

    describe('When ending the quiz', function() {
        it('should call provider end method', function() {
            var providerCalled = false,
                providedRun,
                quizController = new QuizController();
            quizProviderMock.endRun = function(run) {
                providerCalled = true;
                providedRun = run;
                return Promise.resolve();
            };
            answerProviderMock.getTotalCorrect = function() {
                return 2;
            };
            quizProviderMock.getQuestionsCount = function() {
                return 3;
            };
            quizController.init(quizProviderMock, answerProviderMock, timerProviderMock);
            quizController._runId = '123';

            runs(function() {
                quizController.end(true)
                    .then(function() {
                        done = true;
                    });
            });

            waitsFor(function() {
                return done;
            });

            runs(function() {
                expect(providerCalled).toEqual(true);
                expect(providedRun).toBeDefined();
                expect(providedRun.id).toEqual('123');
                expect(providedRun.correctCount).toEqual(2);
                expect(providedRun.wrongCount).toEqual(1);
                //expect(providedRun.duration).toEqual(42);
                expect(providedRun.finished).toEqual(true);
            });
        });

    });

    describe('When getting next question', function() {

        describe('with a current question', function() {
            it('should return next question', function() {
                var passedIndex,
                    newQuestion,
                    quizController = new QuizController();
                quizProviderMock.getQuestion = function(index) {
                    passedIndex = index;
                    return { title: 'BAR' };
                };
                quizController.init(quizProviderMock, answerProviderMock, timerProviderMock);
                quizController.currentQuestionIndex = 0;

                newQuestion = quizController.getNextQuestion();

                expect(passedIndex).toBeDefined();
                expect(passedIndex).toEqual(1);
                expect(newQuestion).toBeDefined();
                expect(newQuestion.title).toEqual('BAR');
            });

            describe('cannot get next question', function() {
                it('should return null', function() {
                    var newQuestion,
                        quizController = new QuizController();
                    quizProviderMock.endRun = function() {
                        return Promise.resolve();
                    };
                    quizProviderMock.getQuestion = function() {
                        return null;
                    };
                    quizController.init(quizProviderMock, answerProviderMock, timerProviderMock);
                    quizController.currentQuestionIndex = 0;

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
                quizProviderMock.getQuestion = function(index) {
                    passedIndex = index;
                    return { title: 'FOO' };
                };
                quizController.init(quizProviderMock, answerProviderMock, timerProviderMock);

                newQuestion = quizController.getNextQuestion();

                expect(passedIndex).toBeDefined();
                expect(passedIndex).toEqual(0);
                expect(newQuestion).toBeDefined();
                expect(newQuestion.title).toEqual('FOO');
            });
        })
    });

    describe('When answering question', function() {
        describe('correctly', function() {
            it('should return that answer is true', function() {
                var isCorrect,
                    currentQuestion = { options: ['FOO', 'BAR'], answer: 1 },
                    quizController = new QuizController();
                quizController.init(quizProviderMock, answerProviderMock, timerProviderMock);
                quizController.currentQuestion = currentQuestion;

                isCorrect = quizController.answer('BAR');
                expect(isCorrect).toBeDefined();

                expect(isCorrect).toEqual(true);
            });
        });

        describe('incorrectly', function() {
            it('should return that answer is false', function() {
                var isCorrect,
                    currentQuestion = { options: ['FOO', 'BAR'], answer: 1 },
                    quizController = new QuizController();
                quizController.init(quizProviderMock, answerProviderMock, timerProviderMock);
                quizController.currentQuestion = currentQuestion;

                isCorrect = quizController.answer('FOO');

                expect(isCorrect).toBeDefined();
                expect(isCorrect).toEqual(false);
            });
        });

        it('should store answer and correctness', function() {
            var runIdGiven,
                questionAnswered,
                givenAnswer,
                isCorrect,
                currentQuestion = { options:['FOO','BAR'], answer: 1 },
                quizController = new QuizController();
            answerProviderMock.save = function(runId, questionIndex, answer, correctness) {
                runIdGiven = runId;
                questionAnswered = questionIndex;
                givenAnswer = answer;
                isCorrect = correctness;
            };
            quizController.init(quizProviderMock, answerProviderMock, timerProviderMock);
            quizController._runId = 'FOO';
            quizController.currentQuestionIndex = 42;
            quizController.currentQuestion = currentQuestion;

            isCorrect = quizController.answer(currentQuestion.options[1]);

            expect(runIdGiven).toBeDefined();
            expect(runIdGiven).toEqual('FOO');
            expect(questionAnswered).toBeDefined();
            expect(questionAnswered).toEqual(42);
            expect(givenAnswer).toBeDefined();
            expect(givenAnswer).toEqual(1);
            expect(isCorrect).toBeDefined();
            expect(isCorrect).toEqual(true);
        });
    });

    describe('When resetting the quiz', function() {
        it('should remove the run id', function() {
            var quizController = new QuizController();
            quizController.init(quizProviderMock, answerProviderMock, timerProviderMock);
            quizController._runId = 'FOO';

            quizController.reset();

            expect(quizController._runId).toBeNull();
        });

        it('should mark the quiz as not finished', function() {
            var quizController = new QuizController();
            quizController.init(quizProviderMock, answerProviderMock, timerProviderMock);
            quizController.isFinished = true;

            quizController.reset();

            expect(quizController.isFinished).toEqual(false);
        });

        it('should mark the quiz as not at last question', function() {
            var quizController = new QuizController();
            quizController.init(quizProviderMock, answerProviderMock, timerProviderMock);
            quizController.submittedLastQuestion = true;

            quizController.reset();

            expect(quizController.submittedLastQuestion).not.toBeTruthy();
        });

        it('should forget currentQuestion', function() {
            var quizController = new QuizController();
            quizController.init(quizProviderMock, answerProviderMock, timerProviderMock);
            quizController.currentQuestion = 'FOO';
            quizController.currentQuestionIndex = 1;

            quizController.reset();

            expect(quizController.currentQuestion).toBeNull();
            expect(quizController.currentQuestionIndex).toEqual(-1);
        });

        it('should reset answer provider', function() {
            var providerCalled,
                quizController = new QuizController();
            answerProviderMock.reset = function() {
                providerCalled = true;
            };
            quizController.init(quizProviderMock, answerProviderMock, timerProviderMock);

            quizController.reset();

            expect(providerCalled).toBeDefined();
            expect(providerCalled).toEqual(true);
        });
    });
});
