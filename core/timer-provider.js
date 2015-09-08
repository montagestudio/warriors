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
        value: function() {}
    },

    init: {
        value: function (time) {
            this.quizTime = time;
            this.currentTime = time;
        }
    },

    _isRunning: {
        value: false
    },

    quizTime: {
        value: null
    },

    currentTime: {
        value: null
    },

    start: {
        value: function () {
            this._isRunning = true;
            this.increment();
        }
    },

    pause: {
        value: function () {
            this._isRunning = false;
        }
    },

    increment: {
        value: function () {
            var self = this;
            if(this._isRunning && this.currentTime > 0) {
                setTimeout(function(){
                    self.currentTime--;
                    self.increment();
                }, 1000);
            } else if (self.currentTime == 0 ) {
                this.dispatchEventNamed("timerHasEnded",true,false);
            }
        }
    },

    reset: {
        value: function (time) {
            this.running = false;
            this.quizTime = time || this.quizTime;
            this.currentTime = time || this.quizTime;
        }
    }
});
