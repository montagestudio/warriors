var QuizProvider = require("core/quiz-provider").QuizProvider,
    Quiz = require('model/quiz').Quiz;

describe('test/quiz-provider-spec', function() {
    var done,
        mockData = {
            title: 'BAZ',
            questions: [
                {
                    title: 'FOO'
                },
                {
                    title: 'BAR'
                }
            ]};
    beforeEach(function() {
        done = false;
    });
    describe('When getting title', function() {
        it('should return title', function() {
            var quizMock = Quiz.load(mockData),
                title,
                quizProvider = new QuizProvider();
            quizProvider.quiz = quizMock;

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
                quizProvider.quiz = quizMock;

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
                quizProvider.quiz = quizMock;

                question = quizProvider.getQuestion(2);

                expect(question).toBeUndefined();
            });
        })
    });
});
