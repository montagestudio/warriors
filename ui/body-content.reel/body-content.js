/**
 * @module ui/body-content.reel
 */
var Component = require("montage/ui/component").Component;

/**
 * @class BodyContent
 * @extends Component
 */
exports.BodyContent = Component.specialize(/** @lends BodyContent# */ {

    enterDocument: {
        value: function (isFirstTime) {
            if (isFirstTime) {
            }
        }
    },


    _targetView: {
        value: null
    },

    handleAnimationend: {
        value: function () {
            this._runningAnimations--;
            if (!this._runningAnimations) {
                this.classList.remove(this._views[this.currentView]);
                this.substitution.switchValue = this._targetView;
                this.currentView = this._targetView;
                this._targetView = null;
                this._element.removeEventListener("animationend", this, false);
                this._element.removeEventListener("animationstart", this, false);
                if (this._callback) {
                    this._callback();
                }
            }
        }
    },

    _runningAnimations: {
        value: 0
    },

    handleAnimationstart: {
        value: function () {
            this._runningAnimations++;
        }
    },

    currentView: {
        value: "intro"
    },

    _views: {
        value: {
            intro: "intro-out",
            quiz: "quiz-out",
            results: "results-out",
            browse: "browse-out",
            timerEnded: "timer-out"
        }
    },

    switchToView: {
        value: function (view, callback) {
            if (this._views[view]) {
                this._runningAnimations = 0;
                this.classList.add(this._views[this.currentView]);
                this._targetView = view;
                this._callback = callback;
                this._element.addEventListener("animationend", this, false);
                this._element.addEventListener("animationstart", this, false);
                this._needsRequestDrawToCheckRunningAnimations = true;
                this.needsDraw = true;
            }
        }
    },

    _needsRequestDrawToCheckRunningAnimations: {
        value: false
    },

    draw: {
        value: function () {
            if (this._needsRequestDrawToCheckRunningAnimations) {
                this._needsRequestDrawToCheckRunningAnimations = false;
                this._needsCheckRunningAnimations = true;
                this.needsDraw = true;
            } else {
                if (this._needsCheckRunningAnimations) {
                    this._needsCheckRunningAnimations = false;
                    if (!this._runningAnimations) {
                        // Simulate the last animation ended
                        this._runningAnimations = 1;
                        this.handleAnimationend();
                    }
                }
            }
        }
    }


});
