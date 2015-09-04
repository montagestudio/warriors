var StatsProvider = require("core/stats-provider").StatsProvider,
StatsProvider = require("core/stats-provider").StatsProvider;

describe('test/stats-provider-spec', function() {
    var done,
    answerProviderMock;
    beforeEach(function () {
        done = false;
        answerProviderMock = {
            answers: [
                { isCorrect: false },
                { isCorrect: false },
                { isCorrect: true },
                { isCorrect: false }
            ]
        }
    });
    describe('When quiz is completed', function() {

        describe('and quiz percentage array returns null', function() {
            it('should return null', function() {
                var percentCorrect,
                    array,
                    statsProvider = new StatsProvider();
                statsProvider.init(null, null);

                array = statsProvider._getQuizPercentageCorrectArray = null;

                expect(array).toBeDefined();
                expect(array).toEqual(null);
            });
        });

        it('should return the total number questions', function() {
            var percentCorrect,
                statsProvider = new StatsProvider();
            statsProvider.init(answerProviderMock, null);

            percentCorrect = statsProvider.answerProvider.answers.length;

            expect(percentCorrect).toBeDefined();
            expect(percentCorrect).toEqual(4);
        });

        it('should return the total number of correct questions', function() {
            var correctAnswersTotal,
                statsProvider = new StatsProvider();
            statsProvider.init(answerProviderMock, null);

            correctAnswersTotal = statsProvider.getTotalCorrect();

            expect(correctAnswersTotal).toBeDefined();
            expect(correctAnswersTotal).toEqual(1);
        });

        it('should return the percentage of correct answers', function() {
            var percentCorrect,
                statsProvider = new StatsProvider();
            statsProvider.init(answerProviderMock, null);

            percentCorrect = statsProvider.getPercentageCorrect();

            expect(percentCorrect).toBeDefined();
            expect(percentCorrect).toEqual(25);
        });

        it('should return the difference of the average percent correct and the current percent correct', function() {
            var averagePercentage,
                percentageDifference,
                statsProvider = new StatsProvider();
            statsProvider.init(answerProviderMock, null);
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
            statsProvider.init(answerProviderMock, null);
            statsProvider._getQuizPercentageCorrectArray = [40,50,20,90,100,30];

            isPercentageHigherThanAverage = statsProvider.isPercentageHigherThanAverage();

            expect(isPercentageHigherThanAverage).toBeDefined();
            expect(isPercentageHigherThanAverage).toEqual(false);
        });
    });
});
