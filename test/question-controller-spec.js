var QuestionController = require("core/question-controller").QuestionController;

describe('test/question-controller-spec', function() {
    var done;
    beforeEach(function() {
        done = false;
    });
    describe('When getting next question', function() {

        describe('with a current question', function() {
            it('should return next question', function() {
                var newQuestion,
                    questionsMock = ['FOO', 'BAR'],
                    questionController = new QuestionController();
                questionController._questions = questionsMock;

                runs(function() {
                    questionController.getNext(0)
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
                    expect(newQuestion).toBeDefined();
                    expect(newQuestion).toEqual('BAR');
                });
            });

            describe('already at last question', function() {
                it('should reject promise', function() {
                    var rejected,
                        questionsMock = ['FOO', 'BAR'],
                        questionController = new QuestionController();
                    questionController._questions = questionsMock;

                    runs(function() {
                        questionController.getNext(1)
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
                var newQuestion,
                    questionsMock = ['FOO', 'BAR'],
                    questionController = new QuestionController();
                questionController._questions = questionsMock;

                runs(function() {
                    questionController.getNext()
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
                    expect(newQuestion).toBeDefined();
                    expect(newQuestion).toEqual('FOO');
                });
            })
        })
    })
});
