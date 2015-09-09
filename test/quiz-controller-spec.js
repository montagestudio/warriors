var Promise = require("montage/core/promise").Promise.Promise,
    QuizController = require("core/quiz-controller").QuizController;

describe('test/quiz-controller-spec', function() {
    var done,
        quizProviderMock,
        answerProviderMock,
        statsProviderMock;
    beforeEach(function() {
        done = false;
        quizProviderMock = {
            loadData: function() {},
            getQuestion: function() { return {}; },
            startRun: function() {},
            endRun: function() {}
        };
        answerProviderMock = {
            save: function() {}
        };
        statsProviderMock = {
            getTotalCorrect: function() {},
            getTotalWrong: function() {},
            loadRunStatistics: function() {},
            getPercentageCorrect: function() {},
            getPercentageDifference: function() {}
        };
    });
    describe('When starting the quiz', function() {
        it('should store run id', function() {
            var quizController = new QuizController();
            quizProviderMock.startRun = function() {
                return Promise.resolve('FOO');
            };
            quizController.init(quizProviderMock, answerProviderMock, statsProviderMock);

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
            quizController.init(quizProviderMock, answerProviderMock, statsProviderMock);

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

            quizController.init(quizProviderMock, answerProviderMock, statsProviderMock);

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
            statsProviderMock.getTotalCorrect = function() {
                return 2;
            };
            statsProviderMock.getTotalWrong = function() {
                return 1;
            };
            quizController.init(quizProviderMock, answerProviderMock, statsProviderMock);
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

        it('should load correct answers average', function() {
            var providerCalled = false,
                quizController = new QuizController();
            quizProviderMock.endRun = function() {
                return Promise.resolve();
            };
            statsProviderMock.loadRunStatistics = function() {
                providerCalled = true;
            };
            quizController.init(quizProviderMock, answerProviderMock, statsProviderMock);

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
                quizController.init(quizProviderMock, answerProviderMock, statsProviderMock);
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
                    quizController.init(quizProviderMock, answerProviderMock, statsProviderMock);
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
                quizController.init(quizProviderMock, answerProviderMock, statsProviderMock);

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
                quizController.init(quizProviderMock, answerProviderMock, statsProviderMock);
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
                quizController.init(quizProviderMock, answerProviderMock, statsProviderMock);
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
            quizController.init(quizProviderMock, answerProviderMock, statsProviderMock);
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

    describe('When getting statistics', function() {
        it('should get percentage correct from provider', function() {
            var providerCalled = false,
                quizController = new QuizController();
            statsProviderMock.getPercentageCorrect = function() {
                providerCalled = true;
            };
            quizController.init(quizProviderMock, answerProviderMock, statsProviderMock);

            quizController.getStatistics();

            expect(providerCalled).toEqual(true);
        });

        it('should get total correct from provider', function() {
            var providerCalled = false,
                quizController = new QuizController();
            statsProviderMock.getTotalCorrect = function() {
                providerCalled = true;
            };
            quizController.init(quizProviderMock, answerProviderMock, statsProviderMock);

            quizController.getStatistics();

            expect(providerCalled).toEqual(true);
        });

        it('should get percentage difference from provider', function() {
            var providerCalled = false,
                quizController = new QuizController();
            statsProviderMock.getPercentageDifference = function() {
                providerCalled = true;
            };
            quizController.init(quizProviderMock, answerProviderMock, statsProviderMock);

            quizController.getStatistics();

            expect(providerCalled).toEqual(true);
        });

        it('should return data from provider', function() {
            var quizController = new QuizController();
            statsProviderMock.getPercentageCorrect = function() {
                return 35.24;
            };
            statsProviderMock.getTotalCorrect = function() {
                return 5;
            };
            statsProviderMock.getPercentageDifference = function() {
                return 17.56;
            };
            quizController.init(quizProviderMock, answerProviderMock, statsProviderMock);

            var statistics = quizController.getStatistics();

            expect(statistics).toBeDefined();
            expect(statistics.percentageCorrect).toEqual(35.24);
            expect(statistics.totalCorrect).toEqual(5);
            expect(statistics.percentageDifference).toEqual(17.56);
        });
    });
});
