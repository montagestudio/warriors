/**
 * @module ui/player-carousel.reel
 */
var Component = require("montage/ui/component").Component,
    KeyComposer = require("montage/composer/key-composer").KeyComposer;

/**
 * @class PlayerCarousel
 * @extends Component
 */
exports.PlayerCarousel = Component.specialize(/** @lends PlayerCarousel# */ {
    currentIndex: {
        value: 0
    },

    transitionStarted: {
        value: false
    },

    flowRibbon: {
        serializable: true,
        value: null
    },

    flowDidTranslateEnd: {
        value: function () {
            this.currentIndex = this.flowRibbon.scroll;
            this.transitionStarted = false;
        }
    },

    flowDidTranslateStart: {
        value: function () {
            this.transitionStarted = true;
        }
    },

    pointInCircleAt: { // returns a point in a unit radius circle with center at origin for a given angle
        value: function (angle) {
            return [Math.cos(angle), Math.sin(angle)];
        }
    },

    tangentInCircleAt: { // returns normalized tangent vector for a point in a circle at a given angle
        value: function (angle) {
            return [-Math.sin(angle), Math.cos(angle)];
        }
    },

    scaleVector: {
        value: function (vector, scale) {
            return [
                vector[0] * scale,
                vector[1] * scale
            ];
        }
    },

    _data: {
        value: null
    },

    data: {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            if (this.flowRibbon) {
                this.flowRibbon.content = value;
                this.flowRibbon.scroll = 2;
                // this.flowRibbon.scroll = Math.floor(this._data.length / 2);
                this.flowDidTranslateEnd();
            }
        }
    },

    setPaths: {
        enumerable: false,
        value: function () {
            var pagesKnots = [],
                evenPagesKnots = [],
                bezierHandlerLength = .130976446, // magic number, optimized length of a handler to create a 16-segments cubic bezier unit radius circle
                point,
                tangent,
                angle,
                halfPageWidth,
                i,
                self = this;

                if (window.innerWidth > 1000) {
                    halfPageWidth = 1300;
                    this.flowRibbon.cameraPosition = [0, 0, 2100];
                    this.flowRibbon.cameraTargetPoint = [0, 0, 0];
                    this.flowRibbon.cameraFov = 50;
                    for (i = -1; i <= 10; i++) {
                        angle = Math.PI - i * Math.PI / 8;
                        point = this.scaleVector(this.pointInCircleAt(angle), halfPageWidth);
                        tangent = this.scaleVector(this.tangentInCircleAt(angle), halfPageWidth * bezierHandlerLength);
                        pagesKnots.push(
                            {
                                "knotPosition": [point[0], 0, point[1]],
                                "previousHandlerPosition": [point[0] + tangent[0], 0, point[1] + tangent[1]],
                                "nextHandlerPosition": [point[0] - tangent[0], 0, point[1] - tangent[1]],
                                "previousDensity": 1.1,
                                "nextDensity": 1.1,
                                "rotateY": Math.PI/2 - angle
                                // "opacity": 1 - Math.abs(i-4)*.2
                            }
                        );
                    }
                } else if (window.innerWidth > 600) {
                    halfPageWidth = 1250;
                    this.flowRibbon.cameraPosition = [0, 0, 2200];
                    this.flowRibbon.cameraTargetPoint = [0, 0, 0];
                    this.flowRibbon.cameraFov = 50;
                    for (i = -1; i <= 10; i++) {
                        angle = Math.PI - i * Math.PI / 8;
                        point = this.scaleVector(this.pointInCircleAt(angle), halfPageWidth);
                        tangent = this.scaleVector(this.tangentInCircleAt(angle), halfPageWidth * bezierHandlerLength);
                        pagesKnots.push(
                            {
                                "knotPosition": [point[0], 0, point[1]],
                                "previousHandlerPosition": [point[0] + tangent[0], 0, point[1] + tangent[1]],
                                "nextHandlerPosition": [point[0] - tangent[0], 0, point[1] - tangent[1]],
                                "previousDensity": 1.1,
                                "nextDensity": 1.1,
                                "rotateY": Math.PI/2 - angle
                                // "opacity": 1 - Math.abs(i-4)*.2
                            }
                        );
                    }
                } else {
                    halfPageWidth = 1200;
                    this.flowRibbon.cameraPosition = [0, 0, 2300];
                    this.flowRibbon.cameraTargetPoint = [0, 0, 0];
                    this.flowRibbon.cameraFov = 50;
                    for (i = -1; i <= 10; i++) {
                        angle = Math.PI - i * Math.PI / 8;
                        point = this.scaleVector(this.pointInCircleAt(angle), halfPageWidth);
                        tangent = this.scaleVector(this.tangentInCircleAt(angle), halfPageWidth * bezierHandlerLength);
                        pagesKnots.push(
                            {
                                "knotPosition": [point[0], 0, point[1]],
                                "previousHandlerPosition": [point[0] + tangent[0], 0, point[1] + tangent[1]],
                                "nextHandlerPosition": [point[0] - tangent[0], 0, point[1] - tangent[1]],
                                "previousDensity": 1.1,
                                "nextDensity": 1.1,
                                "rotateY": Math.PI/2 - angle
                                // "opacity": 1 - Math.abs(i-4)*.2
                            }
                        );
                    }
                }

                this.flowRibbon.paths = [
                    {
                        "knots": pagesKnots,
                        "headOffset": 5.5,
                        "tailOffset": 5.5,
                        "units": {
                            "rotateY": "rad",
                            "opacity": "",
                            "rotateX": "rad"
                        }
                    }
                ];
        }
    },

    enterDocument: {
        value: function (firstTime) {

            var leftComposer,
                rightComposer,
                enterComposer;

            if (firstTime) {
                // this.addEventListener("nextQuestion", this, false);
                enterComposer = new KeyComposer();
                enterComposer.keys = "enter";
                enterComposer.identifier = "enter";
                leftComposer = new KeyComposer();
                leftComposer.keys = "left";
                leftComposer.identifier = "left";
                rightComposer = new KeyComposer();
                rightComposer.keys = "right";
                rightComposer.identifier = "right";
                this.addComposerForElement(enterComposer, window);
                this.addComposerForElement(leftComposer, window);
                this.addComposerForElement(rightComposer, window);
                enterComposer.addEventListener("keyPress", this, false);
                leftComposer.addEventListener("keyPress", this, false);
                rightComposer.addEventListener("keyPress", this, false);
            }
        }
    },

    handleKeyPress: {
        value: function (event) {
            var flowIterations,
                iteration,
                i = 0;

            switch (event.identifier) {
                case "left":
                    this.flowRibbon.previousStride();
                break;
                case "enter":
                  // $fix - need to put in option model and question-controller
                    flowIterations = this.flowRibbon._repetition.iterations;
                    while (i < flowIterations.length && flowIterations[i].object !== this.flowRibbon.content[this.currentIndex]) {
                        i++;
                    };
                    if (i < flowIterations.length) {
                        flowIterations[i].firstElement.children[0].component.handleAction();
                    }
                break;
                case "right":
                    this.flowRibbon.nextStride();
                break;
            }
        }
    },

    templateDidLoad: {
        value: function () {
            var self = this;
            this.setPaths();

            // handle resize function this.setPaths

            window.addEventListener("resize", function () {
                self.setPaths();
            }, false);
        }
    }
});
