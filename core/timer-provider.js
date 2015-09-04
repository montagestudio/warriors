/**
 * @module timer-provider
 */
var Montage = require("montage/core/core").Montage,
Target = require("montage/core/target").Target;
/**
 * @class TimerProvider
 * @extends Montage
 */
exports.TimerProvider = Target.specialize(/** @lends TimerProvider# */ {

    constructor: {
        value: function() {

        }
    },

    init: {
        value: function (time) {
            this.currentTime = time;
            this.isActiveTarget = true;
        }
    },

    _isRunning: {
        value: false
    },

    startTime: {
        value: 5
    },

    currentTime: {
        value: 5
    },

    start: {
        value: function () {
            console.log("timer started");
            this._isRunning = true;
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
            if(this._isRunning && this.currentTime > 0) {
                setTimeout(function(){
                    console.log(self.currentTime);
                    self.currentTime--;
                    self.increment();
                }, 1000);
            } else if (self.currentTime == 0 ) {
                console.log("should dispatch event");
                this.dispatchEventNamed("timerHasEnded",true,false);
            }
        }
    },

    reset: {
        value: function () {
            this.running = false;
            this.currentTime = this.startTime;
        }
    }
});
