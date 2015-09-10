/**
 * @module ui/timer.reel
 */
var Component = require("montage/ui/component").Component;

/**
 * @class Timer
 * @extends Component
 */
exports.Timer = Component.specialize(/** @lends Timer# */ {
    _currentTime: {
        value: null
    },

    currentTime: {
        get: function() {
            var prefix = this._currentTime < 10 ? '0' : '';
            return prefix + this._currentTime;
        },
        set: function(time) {
            this._currentTime = time;
        }
    }
});
