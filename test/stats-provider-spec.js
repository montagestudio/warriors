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
                statsProvider.init('42', null);

                array = statsProvider._getQuizPercentageCorrectArray = null;

                expect(array).toBeDefined();
                expect(array).toEqual(null);
            });
        });

    });

    describe('When loading run statistics', function() {
        it('should get statistics from the backend', function() {
            var providedPath,
                statsProvider = new StatsProvider();
            backendServiceMock.get = function(path) {
                providedPath = path;
                return Promise.resolve({ status: 204 });
            };
            statsProvider.init('42', backendServiceMock);

            runs(function() {
                statsProvider.loadRunStatistics()
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
    });

});
