var StatsProvider = require("core/stats-provider").StatsProvider;

describe('test/stats-provider-spec', function() {
    var done,
        answerProviderMock,
        backendServiceMock;
    beforeEach(function () {
        done = false;
        answerProviderMock = {
            answers: [
                { isCorrect: false },
                { isCorrect: false },
                { isCorrect: true },
                { isCorrect: false }
            ]
        };
        backendServiceMock = {
            get: function() {}
        };
    });
    describe('When quiz is completed', function() {

        describe('and quiz percentage array returns null', function() {
            it('should return null', function() {
                var array,
                    statsProvider = new StatsProvider();
                statsProvider.init('42', null, null);

                array = statsProvider._getQuizPercentageCorrectArray = null;

                expect(array).toBeDefined();
                expect(array).toEqual(null);
            });
        });

        it('should return the total number questions', function() {
            var totalCount,
                statsProvider = new StatsProvider();
            statsProvider.init('42', answerProviderMock, null);

            totalCount = statsProvider.getTotal();

            expect(totalCount).toBeDefined();
            expect(totalCount).toEqual(4);
        });

        it('should return the total number of correct answers', function() {
            var correctAnswersTotal,
                statsProvider = new StatsProvider();
            statsProvider.init('42', answerProviderMock, null);

            correctAnswersTotal = statsProvider.getTotalCorrect();

            expect(correctAnswersTotal).toBeDefined();
            expect(correctAnswersTotal).toEqual(1);
        });

        it('should return the total number of wrong answers', function() {
            var wrongAnswersTotal,
                statsProvider = new StatsProvider();
            statsProvider.init('42', answerProviderMock, null);

            wrongAnswersTotal = statsProvider.getTotalWrong();

            expect(wrongAnswersTotal).toBeDefined();
            expect(wrongAnswersTotal).toEqual(3);
        });

        it('should return the percentage of correct answers', function() {
            var percentCorrect,
                statsProvider = new StatsProvider();
            statsProvider.init('42', answerProviderMock, null);

            percentCorrect = statsProvider.getPercentageCorrect();

            expect(percentCorrect).toBeDefined();
            expect(percentCorrect).toEqual(25);
        });

        it('should return the difference of the average percent correct and the current percent correct', function() {
            var averagePercentage,
                percentageDifference,
                statsProvider = new StatsProvider();
            statsProvider.init('42', answerProviderMock, null);
            statsProvider._getQuizPercentageCorrectArray = [40,50,20,90,100,30];

            averagePercentage = statsProvider._getAveragePercentCorrect();
            percentageDifference = statsProvider.getPercentageDifference();

            expect(averagePercentage).toBeDefined();
            expect(averagePercentage).toEqual(55);
            expect(percentageDifference).toBeDefined();
            expect(percentageDifference).toEqual(-30);
        });

        it('should return true if the current percent correct is higher than the average percent correct', function() {
            var isPercentageHigherThanAverage,
                statsProvider = new StatsProvider();
            statsProvider.init('42', answerProviderMock, null);
            statsProvider._getQuizPercentageCorrectArray = [40,50,20,90,100,30];

            isPercentageHigherThanAverage = statsProvider.isPercentageHigherThanAverage();

            expect(isPercentageHigherThanAverage).toBeDefined();
            expect(isPercentageHigherThanAverage).toEqual(false);
        });
    });

    describe('When loading average percent correct', function() {
        it('should get average percent correct from the backend', function() {
            var providedPath,
                statsProvider = new StatsProvider();
            backendServiceMock.get = function(path) {
                providedPath = path;
                return Promise.resolve({ status: 204 });
            };
            statsProvider.init('42', answerProviderMock, null, backendServiceMock);

            runs(function() {
                statsProvider.loadAveragePercentCorrect()
                    .then(function() {
                        done = true;
                    });
            });

            waitsFor(function() {
                return done;
            });

            runs(function() {
                expect(providedPath).toBeDefined();
                expect(providedPath).toEqual('quiz/42/stats');
            })
        });

        it('should store average percent correct', function() {
            var providedPath,
                statsProvider = new StatsProvider();
            backendServiceMock.get = function() {
                return Promise.resolve({ status: 200, body: '[12.34, 42.42, 80.23]' });
            };
            statsProvider.init('42', answerProviderMock, null, backendServiceMock);

            runs(function() {
                statsProvider.loadAveragePercentCorrect()
                    .then(function() {
                        done = true;
                    });
            });

            waitsFor(function() {
                return done;
            });

            runs(function() {
                expect(statsProvider._quizPercentageCorrectArray).not.toBeNull();
                expect(statsProvider._quizPercentageCorrectArray.length).toEqual(3);
                expect(statsProvider._quizPercentageCorrectArray[0]).toEqual(12.34);
                expect(statsProvider._quizPercentageCorrectArray[1]).toEqual(42.42);
                expect(statsProvider._quizPercentageCorrectArray[2]).toEqual(80.23);
            })
        });
    });

});
