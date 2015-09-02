/**
 * @module ui/timer.reel
 */
var Component = require("montage/ui/component").Component;

/**
 * @class Timer
 * @extends Component
 */
exports.Timer = Component.specialize(/** @lends Timer# */ {
    constructor: {
        value: function Timer() {
            this.super();
        }
    },

    _isRunning: {
        value: false
    },

    startTime: {
        value: 60
    },

    currentTime: {
        value: null
    },

    start: {
        value: function () {
            this.isRunning = true;
            this.increment();
        }
    },

    pause: {
        value: function () {
            this.isRunning = false;
        }
    },

    increment: {
        value: function () {
            var self = this;
            if(self.isRunning && self.currentTime > 0) {
                setTimeout(function(){
                    self.currentTime--;
                    self.increment();
                }, 1000);
            } else if (self.currentTime == 0 ) {
                console.log("times up");
            }
        }
    },

    reset: {
        value: function () {
            this.running = false;
            this.currentTime = this.startTime;
        }
    },

    enterDocument: {
        value: function () {
            this.currentTime = this.startTime;
            this._isRunning = true;
            // this.start();
        }
    }

});
