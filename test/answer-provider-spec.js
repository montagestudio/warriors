var AnswerProvider = require("core/answer-provider").AnswerProvider;

describe('test/answer-provider-spec', function() {
    var done;
    beforeEach(function () {
        done = false;
    });
    describe('When saving an answer', function() {
        it('should store the answer locally', function() {
            var answerProvider = new AnswerProvider();

            answerProvider.save(42, 'FOO', true);

            expect(answerProvider._answers).toBeDefined();
            expect(answerProvider._answers.length).toBeDefined();
            expect(answerProvider._answers.length).toEqual(1);
            var savedAnswer = answerProvider._answers[0];
            expect(savedAnswer).toBeDefined();
            expect(savedAnswer.index).toEqual(42);
            expect(savedAnswer.answer).toEqual('FOO');
            expect(savedAnswer.isCorrect).toEqual(true);
        });
    });

    describe('When saving two answers', function() {
        it('should store the answers locally', function() {
            var answerProvider = new AnswerProvider();

            answerProvider.save(42, 'FOO', true);
            answerProvider.save(123, 'BAR', false);

            expect(answerProvider._answers).toBeDefined();
            expect(answerProvider._answers.length).toBeDefined();
            expect(answerProvider._answers.length).toEqual(2);
            var savedAnswer0 = answerProvider._answers[0];
            expect(savedAnswer0).toBeDefined();
            expect(savedAnswer0.index).toEqual(42);
            expect(savedAnswer0.answer).toEqual('FOO');
            expect(savedAnswer0.isCorrect).toEqual(true);
            var savedAnswer1 = answerProvider._answers[1];
            expect(savedAnswer1).toBeDefined();
            expect(savedAnswer1.index).toEqual(123);
            expect(savedAnswer1.answer).toEqual('BAR');
            expect(savedAnswer1.isCorrect).toEqual(false);
        });
    });
});
