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
        it('should calculate percentage correct', function() {
            var percentCorrect,
                statsProvider = new StatsProvider();
            statsProvider.init(answerProviderMock);

            percentCorrect = statsProvider.getPercentageCorrect();

            console.log(percentCorrect);

            expect(percentCorrect).toBeDefined();
            expect(percentCorrect).toEqual(25);
        });
    });
});
