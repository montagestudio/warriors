var QuestionController = require("core/question-controller").QuestionController;

describe('test/question-controller-spec', function() {
    var done;
    beforeEach(function() {
        done = false;
    });
    describe('When getting a question', function() {
        describe('with an existing index', function() {
            it('should return corresponding question', function() {
                var questionsMock = ['FOO', 'BAR'],
                    question,
                    questionController = new QuestionController();
                questionController._questions = questionsMock;

                runs(function() {
                    questionController.getQuestion(0)
                        .then(function(_question) {
                            question = _question;
                        })
                        .finally(function() {
                            done = true;
                        });
                });

                waitsFor(function() {
                    return done;
                });

                runs(function() {
                    expect(question).toBeDefined();
                    expect(question).toEqual('FOO');
                });
            });
        });

        describe('with a non-existing index', function() {
            it('should reject promise', function() {
                var questionsMock = ['FOO', 'BAR'],
                    rejected,
                    questionController = new QuestionController();
                questionController._questions = questionsMock;

                runs(function() {
                    questionController.getQuestion(2)
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
        })
    });
});
