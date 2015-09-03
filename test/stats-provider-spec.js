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

            correctAnswersTotal = statsProvider._getTotalCorrect();

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

            isPercentageHigherThanAverage = statsProvider.isPercentageHigherThanAverage();

            expect(isPercentageHigherThanAverage).toBeDefined();
            expect(isPercentageHigherThanAverage).toEqual(false);
        });
    });
});
