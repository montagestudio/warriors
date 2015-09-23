/**
 * @module stats-provider
 */
var Montage = require("montage/core/core").Montage,
    Promise = require("montage/core/promise").Promise.Promise;
/**
 * @class StatsProvider
 * @extends Montage
 */
exports.StatsProvider = Montage.specialize(/** @lends StatsProvider# */ {
    _backendService: {
        value: null
    },

    _quizId: {
        value: null
    },

    quizElapsedTimeArray: {
        value: null
    },

    quizPercentageCorrectArray: {
        value: null
    },

    init: {
        value: function(quizId, backendService) {
            this._quizId = quizId;
            this._backendService = backendService;
        }
    },

    loadRunStatistics: {
        value: function() {
            var self = this;
            return this._backendService.get(['quiz', this._quizId, 'stats'].join('/'))
                .then(function(response) {
                    if (response.status == 200) {
                        var statistics = JSON.parse(response.body);
                        self.quizPercentageCorrectArray = statistics.map(function(x) { return x.score; });
                        self.quizElapsedTimeArray = statistics.map(function(x) { return x.duration; });
                    } else if (response.status == 204) {
                        self.quizPercentageCorrectArray = [];
                        self.quizElapsedTimeArray = [];
                    }
                });
        }
    }

});







