/**
 * @module ui/browse-players.reel
 */
var Component = require("montage/ui/component").Component,
    PlayerProvider = require("core/player-provider").PlayerProvider,
    BackendService = require("core/backend-service").BackendService,
    configuration = require('core/configuration').configuration,
    Promise = require("montage/core/promise").Promise.Promise;

/**
 * @class BrowsePlayers
 * @extends Component
 */
exports.BrowsePlayers = Component.specialize(/** @lends BrowsePlayers# */ {

    _players: {
        value: null
    },

    players: {
        set: function(value) {
            if(value !== this._players) {
                this._players = value;
            }
        },

        get: function () {
            return this._players;
        }
    },

    constructor: {
        value: function () {
            var self = this;
            var playerProvider = new PlayerProvider();
            var backendService = new BackendService();

            backendService.init(configuration.backendUrl);
            playerProvider.init(configuration.quizId, backendService);

            playerProvider.loadData()
                .then(function () {
                    self.players = playerProvider.players;
                });
        }
    },

    // sets transition

    isActive: {
        value: null
    },

    handleViewResultsAction: {
        value: function () {
            this.isActive = false;
        }
    },

    handleRestartQuizAction: {
        value: function () {
            this.isActive = false;
        }
    },

    enterDocument: {
        value: function(isFirstTime) {
            this.isActive = true;
            // working on firing transitionend events
            this.addEventListener("transitionend", console.log('transition ended'), false);
        }
    }

});
