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
            this.tick = new Audio('../assets/tick.wav');
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

    _timeoutId: {
        value: null
    },

    _hasExpired: {
        value: null
    },

    start: {
        value: function (time) {
            if (this._timeoutId) {
                clearTimeout(this._timeoutId);
            }
            this.quizTime = time;
            this.currentTime = time;
            this._isRunning = true;
            this._hasExpired = false;
            this.increment();
        }
    },

    pause: {
        value: function () {
            clearTimeout(this._timeoutId);
            this._isRunning = false;
        }
    },

    resume: {
        value: function() {
            if (this.quizTime && !this._hasExpired) {
                this._isRunning = true;
                this.increment();
            }
        }
    },

    increment: {
        value: function () {
            var self = this;

            if(this._isRunning && this.currentTime > 0) {
                // self.tick.play();
                this._timeoutId = setTimeout(function(){
                    self.currentTime--;
                    self.increment();
                }, 1000);
            } else if (self.currentTime == 0) {
                clearTimeout(this._timeoutId);
                this.dispatchEventNamed("timerHasEnded",true,false);
                this._hasExpired = true;
            }
        }
    },

    getElapsedTime: {
        value: function () {
            return this.quizTime - this.currentTime;
        }
    }
});
