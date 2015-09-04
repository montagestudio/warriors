var TimerProvider = require("core/timer-provider").TimerProvider;

describe('test/timer-provider-spec', function() {
    var done;
    beforeEach(function () {
        done = false;
    });

    describe('When quiz is completed', function() {

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
