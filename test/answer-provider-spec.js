var AnswerProvider = require("core/answer-provider").AnswerProvider;

describe('test/answer-provider-spec', function() {
    var done,
        backendServiceMock;
    beforeEach(function () {
        done = false;
        backendServiceMock = {
            post: function(path, data) {}
        };
    });
    describe('When saving an answer', function() {
        it('should store the answer locally', function() {
            var answerProvider = new AnswerProvider();
            answerProvider.init(backendServiceMock);

            answerProvider.save('MY_RUN', 42, 'FOO', true);

            expect(answerProvider.answers).toBeDefined();
            expect(answerProvider.answers.length).toBeDefined();
            expect(answerProvider.answers.length).toEqual(1);
            var savedAnswer = answerProvider.answers[0];
            expect(savedAnswer).toBeDefined();
            expect(savedAnswer.runId).toEqual('MY_RUN');
            expect(savedAnswer.question).toEqual(42);
            expect(savedAnswer.answer).toEqual('FOO');
            expect(savedAnswer.isCorrect).toEqual(true);
        });

        it('should record answer on backend', function() {
            var pathUsed,
                recordedAnswer,
                answerProvider = new AnswerProvider();
            backendServiceMock.post = function(path, data) {
                pathUsed = path;
                recordedAnswer = data;
            };
            answerProvider.init(backendServiceMock);

            answerProvider.save('MY_RUN', 42, 'FOO', true);

            expect(pathUsed).toBeDefined();
            expect(pathUsed).toEqual('run/MY_RUN/answer');
            expect(recordedAnswer).toBeDefined();
            expect(recordedAnswer.runId).toEqual('MY_RUN');
            expect(recordedAnswer.question).toEqual(42);
            expect(recordedAnswer.answer).toEqual('FOO');
            expect(recordedAnswer.isCorrect).toEqual(true);
        });
    });

    describe('When saving two answers', function() {
        it('should store the answers locally', function() {
            var answerProvider = new AnswerProvider();
            answerProvider.init(backendServiceMock);

            answerProvider.save('MY_RUN', 42, 'FOO', true);
            answerProvider.save('MY_RUN', 123, 'BAR', false);

            expect(answerProvider.answers).toBeDefined();
            expect(answerProvider.answers.length).toBeDefined();
            expect(answerProvider.answers.length).toEqual(2);

            var savedAnswer0 = answerProvider.answers[0];
            expect(savedAnswer0).toBeDefined();
            expect(savedAnswer0.runId).toEqual('MY_RUN');
            expect(savedAnswer0.question).toEqual(42);
            expect(savedAnswer0.answer).toEqual('FOO');
            expect(savedAnswer0.isCorrect).toEqual(true);

            var savedAnswer1 = answerProvider.answers[1];
            expect(savedAnswer1).toBeDefined();
            expect(savedAnswer1.runId).toEqual('MY_RUN');
            expect(savedAnswer1.question).toEqual(123);
            expect(savedAnswer1.answer).toEqual('BAR');
            expect(savedAnswer1.isCorrect).toEqual(false);
        });
    });

    describe('When resetting', function() {
        it('should remove saved answers', function() {
            var answerProvider = new AnswerProvider();
            answerProvider.init(backendServiceMock);
            answerProvider.answers = ['FOO', 'BAR'];

            answerProvider.reset();

            expect(answerProvider.answers.length).toEqual(0);
        });
    });
});
