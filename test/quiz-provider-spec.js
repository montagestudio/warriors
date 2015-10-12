var QuizProvider = require("core/quiz-provider").QuizProvider,
    Quiz = require('model/quiz').Quiz,
    Run = require('model/run').Run;

describe('test/quiz-provider-spec', function() {
    var done,
        mockData = {
            title: 'BAZ',
            questions: [
                { title: 'FOO' },
                { title: 'BAR' }
            ]},
        backendServiceMock;
    beforeEach(function() {
        done = false;
        backendServiceMock = {
            get: function() {}
        };
    });
    describe('When getting title', function() {
        it('should return title', function() {
            var quizMock = Quiz.load(mockData),
                title,
                quizProvider = new QuizProvider();
            quizProvider.init(42, backendServiceMock);
            quizProvider._quiz = quizMock;

            title = quizProvider.getTitle();

            expect(title).toBeDefined();
            expect(title).toEqual('BAZ');
        })
    });

    describe('When getting a question', function() {
        describe('with an existing index', function() {
            it('should return corresponding question', function() {
                var quizMock = Quiz.load(mockData),
                    question,
                    quizProvider = new QuizProvider();
                quizProvider.init(42, backendServiceMock);
                quizProvider._quiz = quizMock;

                question = quizProvider.getQuestion(0);

                expect(question).toBeDefined();
                expect(question.title).toEqual('FOO');
            });
        });

        describe('with a non-existing index', function() {
            it('should return undefined', function() {
                var quizMock = Quiz.load(mockData),
                    question,
                    quizProvider = new QuizProvider();
                quizProvider.init(42, backendServiceMock);
                quizProvider._quiz = quizMock;

                question = quizProvider.getQuestion(2);

                expect(question).toBeUndefined();
            });
        })
    });

    describe('When starting a run', function() {
        it('should get the run id from the backend', function() {
            var providedPath,
                remoteRunId,
                quizProvider = new QuizProvider();
            backendServiceMock.get = function(path) {
                providedPath = path;
                return Promise.resolve({ status: 201, body: 'FOO' });
            };
            quizProvider.init(42, backendServiceMock);

            runs(function() {
                quizProvider.startRun()
                    .then(function(runId) {
                        remoteRunId = runId;
                        done = true;
                    });
            });

            waitsFor(function() {
                return done;
            });

            runs(function() {
                expect(providedPath).toBeDefined();
                expect(providedPath).toEqual('quiz/42/run');
                expect(remoteRunId).toBeDefined();
                expect(remoteRunId).toEqual('FOO');
            });
        });
    });

    describe('When ending a run', function() {
        it('should send run data to the backend', function() {
            var providedPath,
                dataSent,
                quizProvider = new QuizProvider();
            backendServiceMock.put = function(path, data) {
                providedPath = path;
                dataSent = data;
                return Promise.resolve();
            };
            quizProvider.init(42, backendServiceMock);

            runs(function() {
                quizProvider.endRun(new Run('123', 3, 2, 24, true))
                    .then(function() {
                        done = true;
                    });
            });

            waitsFor(function() {
                return done;
            });

            runs(function() {
                expect(providedPath).toBeDefined();
                expect(providedPath).toEqual('run/123/end');
                expect(dataSent).toBeDefined();
                expect(dataSent.id).toEqual('123');
                expect(dataSent.correctCount).toEqual(3);
                expect(dataSent.wrongCount).toEqual(2);
                expect(dataSent.duration).toEqual(24);
                expect(dataSent.finished).toEqual(true);
            });
        });
    });

    describe('When getting questions count', function() {
        it('should return total count of questions', function() {
            var quizMock = Quiz.load(mockData),
                questionsCount,
                quizProvider = new QuizProvider();
            quizProvider.init(42, backendServiceMock);
            quizProvider._quiz = quizMock;

            questionsCount = quizProvider.getQuestionsCount();

            expect(questionsCount).toBeDefined();
            expect(questionsCount).toEqual(2);
        });
    });
});
