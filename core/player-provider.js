/**
 * @module player-provider
 */
var Montage = require("montage/core/core").Montage,
    Player = require('model/player').Player,
    configuration = require('core/configuration').configuration,
    Promise = require("montage/core/promise").Promise.Promise;
/**
 * @class PlayerProvider
 * @extends Montage
 */
exports.PlayerProvider = Montage.specialize(/** @lends PlayerProvider# */ {

    players: {
        value: null
    },

    _quizId: {
        value: null
    },

    _backendService: {
        value: null
    },

    init: {
        value: function(quizId, backendService) {
            this._quizId = quizId;
            this._backendService = backendService;
            return this;
        }
    },

    loadData: {
        value: function () {
            var self = this;
            return this._backendService.get(['player', this._quizId].join('/'))
                .then(function (response) {
                    if (response.status === 200) {
                        self.players = JSON.parse(response.body);
                    }
                });
        }
    },

    getPlayer: {
        value: function(number) {
            return this.players.filter(function(x) { return x.number === number; })[0];
        }
    }
});







